package com.example.gameoflife.services;

import com.example.gameoflife.application.GameOfLife;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.stereotype.Service;

@Service
public class GameOfLifeService {
    private GameOfLife gameOfLife = new GameOfLife();
    public GameOfLifeService() {}

    public void FeedCell()
    {
        this.gameOfLife.FeedCell();
    }
    public void KillCell()
    {
        this.gameOfLife.KillCell();
    }
    public void ReproduceCell()
    {
        this.gameOfLife.ReproduceCell();
    }
    public void MoveCell()
    {
        this.gameOfLife.MoveCell();
    }
}
