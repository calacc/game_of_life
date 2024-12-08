package com.example.gameoflifeui;

import com.example.gameoflife.application.CellState;
import com.example.gameoflife.application.GameState;
import com.example.gameoflife.application.Resource;
import com.example.gameoflife.application.State;
import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;
import javafx.util.Duration;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javafx.scene.shape.*;
import javafx.scene.paint.Color;

@Component
public class GameController {
    private static String BASE_URL = "http://localhost:8080/game-of-life";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    @FXML
    private Pane cellsContainer;

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
            List<Resource> resources = Arrays.asList(gameState.resources);

            for (CellState cell : cells) {
                Rectangle square = new Rectangle(10, 10);
                square.setFill(Color.BLUE);

                square.setX(cell.x * 10);
                square.setY(cell.y * 10);

                if(cell.state == State.HUNGRY) {
                    square.setFill(Color.ORANGE);
                }

                cellsContainer.getChildren().add(square);
            }
            for (Resource resource : resources) {
                Rectangle resourceSquare = new Rectangle(10, 10);
                resourceSquare.setFill(Color.GREEN);

                resourceSquare.setX(resource.row * 10);
                resourceSquare.setY(resource.col * 10);

                cellsContainer.getChildren().add(resourceSquare);
            }
        }
    }
}
