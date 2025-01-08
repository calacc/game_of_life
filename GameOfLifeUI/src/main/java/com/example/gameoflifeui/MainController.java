package com.example.gameoflifeui;

import com.example.gameoflife.dto.GameOfLifeDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.fxml.FXMLLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class MainController {
    private static final String BASE_URL = "http://localhost:8080/game-of-life";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @Autowired
    private GameController gameController;
    @FXML
    private Button startGameButton;

    @FXML
    private TextField resourcesField;

    @FXML
    private TextField sexualCellsField;

    @FXML
    private TextField asexualCellsField;

    public MainController() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    @FXML
    public void initialize() {
        startGameButton.setOnAction(e -> startNewGame());
    }

    private void startNewGame() {
        try {
            int numberOfResources = Integer.parseInt(resourcesField.getText());
            int numberOfSexualCells = Integer.parseInt(sexualCellsField.getText());
            int numberOfAsexualCells = Integer.parseInt(asexualCellsField.getText());

            GameOfLifeDto config = new GameOfLifeDto();
            config.setStartingNrResources(numberOfResources);
            config.setStartingNrSexualCells(numberOfSexualCells);
            config.setStartingNrAsexualCells(numberOfAsexualCells);

            String jsonBody = objectMapper.writeValueAsString(config);

            // Request to start the game
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/createGameOfLife"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                // Open the game window
                openGameWindow();

            } else {
                System.err.println("Failed to start a new game.");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private void openGameWindow() {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/GameView.fxml"));

            // Ensure the controller is managed by Spring
            loader.setControllerFactory(clazz -> GameApplication.getApplicationContext().getBean(clazz));

            Scene gameScene = new Scene(loader.load());
            Stage gameStage = new Stage();
            gameStage.setScene(gameScene);
            gameStage.setTitle("Game of Life");
            gameStage.show();

            // Close the main window
            Stage currentStage = (Stage) startGameButton.getScene().getWindow();
            currentStage.close();

            gameController.setupGameLoop();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
