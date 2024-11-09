package com.example.gameoflife.controllers;

import com.example.gameoflife.application.GameOfLife;
import com.example.gameoflife.application.GameState;
import com.example.gameoflife.services.GameOfLifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-of-life")
public class GameOfLifeController {

    private final GameOfLifeService gameOfLifeService;

    @Autowired
    public GameOfLifeController(GameOfLifeService gameOfLifeService) {
        this.gameOfLifeService = gameOfLifeService;
    }

    @GetMapping("/getState")
    public ResponseEntity<?> getState() {
        if (gameOfLifeService.isGameOfLifeCreated()) {
            GameState gameState = gameOfLifeService.getGameOfLife().getState();
            return ResponseEntity.ok(gameState);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Game of life does not exist -> please create a new game");
        }
    }

    @PutMapping("/startGameOfLife")
    public ResponseEntity<String> startGameOfLife() {
        if (gameOfLifeService.isGameOfLifeCreated()) {
            // Run startGameOfLife in a separate thread
            new Thread(() -> gameOfLifeService.startGameOfLife()).start();
            return ResponseEntity.ok("Game of life has been started");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Game of life does not exist -> please create a new game");
        }
    }

    @PutMapping("/stopGameOfLife")
    public ResponseEntity<String> stopGameOfLife() {
        if (gameOfLifeService.isGameOfLifeCreated()) {
            gameOfLifeService.stopGameOfLife();
            return ResponseEntity.ok("Game of life has been stopped");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Game of life does not exist -> please create a new game");
        }
    }

    @PostMapping("/createGameOfLife")
    public ResponseEntity<String> createGameOfLife() {
        if (gameOfLifeService.isGameOfLifeCreated()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Game of life already exists");
        } else {
            gameOfLifeService.createGameOfLife();
            return ResponseEntity.ok("Game of life created");
        }
    }
}