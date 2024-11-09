package com.example.gameoflife.services;

import com.example.gameoflife.application.GameOfLife;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.stereotype.Service;

@Service
public class GameOfLifeService {
    private GameOfLife gameOfLife;

    public GameOfLife createGameOfLife() {
        if (this.gameOfLife == null) {
            this.gameOfLife = new GameOfLife();
        }
        return this.gameOfLife;
    }

    public void startGameOfLife() {
        if (this.gameOfLife != null) {
            gameOfLife.startGame();
        }
    }
    public void stopGameOfLife() {
        if (this.gameOfLife != null) {
            gameOfLife.stopGame();
        }
    }

    public void resetGameOfLife() {
        this.gameOfLife = null;
    }

    public boolean isGameOfLifeCreated() {
        return this.gameOfLife != null;
    }

    public GameOfLife getGameOfLife() {
        return this.gameOfLife;
    }
}
