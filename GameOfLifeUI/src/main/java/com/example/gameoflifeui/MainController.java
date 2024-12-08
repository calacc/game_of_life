package com.example.gameoflifeui;

import javafx.fxml.FXML;
import javafx.scene.control.Button;
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

    @Autowired
    private GameController gameController;
    @FXML
    private Button startGameButton;

    public MainController() {
        this.httpClient = HttpClient.newHttpClient();
    }

    @FXML
    public void initialize() {
        startGameButton.setOnAction(e -> startNewGame());
    }

    private void startNewGame() {
        try {
            // Request to start the game
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/createGameOfLife"))
                    .POST(HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                // Open the game window
                openGameWindow();

                request = HttpRequest.newBuilder()
                        .uri(URI.create(BASE_URL + "/startGameOfLife"))
                        .PUT(HttpRequest.BodyPublishers.noBody())
                        .build();
                response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

//                if (response.statusCode() == 200)
//                {
//                    openGameWindow();
//                    gameController.setupGameLoop();
//                }

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
