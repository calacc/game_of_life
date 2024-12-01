package com.example.gameoflifeui;

import com.example.gameoflife.application.CellState;
import com.example.gameoflife.application.GameState;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;

@Component
public class GameController {
    private static String BASE_URL = "http://localhost:8080/game-of-life";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @FXML
    private VBox cellsContainer;

    public GameController() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public GameState getGameState() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/getState"))
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if(response.statusCode() == 200) {
                return objectMapper.readValue(response.body(), GameState.class);
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void setupGameLoop() {
        // Timeline to fetch game state periodically and update the UI
        Timeline gameLoop = new Timeline(new KeyFrame(Duration.seconds(1), e -> updateGameState()));
        gameLoop.setCycleCount(Timeline.INDEFINITE);
        gameLoop.play();
    }

    @FXML
    private void updateGameState() {
        // Fetch the updated game state from the backend
        GameState gameState = getGameState();

        if (gameState != null) {
            // Clear the previous cells
            cellsContainer.getChildren().clear();

            // Display each cell as a Label at the corresponding x, y position
            List<CellState> cells = Arrays.asList(gameState.activeCells);
            for (CellState cell : cells) {
                Label cellLabel = new Label("Cell at (" + cell.x + "," + cell.y + ")");
                cellLabel.setStyle("-fx-background-color: blue; -fx-text-fill: white; -fx-font-size: 12px;");
                cellLabel.setMinSize(10, 10);
                cellsContainer.getChildren().add(cellLabel);
            }
        }
    }

//    @FXML
//    public void initialize() {
//        GameState gameState = getGameState();
//        if(gameState != null) {
//            List<CellState> cells = Arrays.asList(gameState.activeCells);
//            for(CellState cell : cells) {
//                Label cellLabel = new Label("Cell at (" + cell.x + "," + cell.y + ")");
//                cellsContainer.getChildren().add(cellLabel);
//            }
//        } else {
//            Label errorLabel = new Label("No active cells");
//            cellsContainer.getChildren().add(errorLabel);
//        }
//    }
}
