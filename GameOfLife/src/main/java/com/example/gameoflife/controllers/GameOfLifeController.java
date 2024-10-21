package com.example.gameoflife.controllers;

import com.example.gameoflife.application.GameOfLife;
import com.example.gameoflife.services.GameOfLifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gameOfLife")
public class GameOfLifeController {

    @Autowired
    private GameOfLifeService gameOfLifeService;

    @PutMapping("feedCell")
    public void FeedCell()
    {
        this.gameOfLifeService.FeedCell();
    }
    @DeleteMapping("deleteCell")
    public void KillCell()
    {
        this.gameOfLifeService.KillCell();
    }
    @PostMapping("reproduceCell")
    public void ReproduceCell()
    {
        this.gameOfLifeService.ReproduceCell();
    }
    @PutMapping("moveCell")
    public void MoveCell()
    {
        this.gameOfLifeService.MoveCell();
    }
}
