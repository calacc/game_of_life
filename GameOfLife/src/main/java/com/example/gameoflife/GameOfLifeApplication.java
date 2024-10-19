package com.example.gameoflife;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Random;

@SpringBootApplication
public class GameOfLifeApplication {
    protected int startingNrCells=10, startingNrResources=10, mapSize=20;
    protected ArrayList<Cell> cells;
    protected ArrayList<Resource> resources;
    public GameOfLifeApplication()
    {
        Random random = new Random();
        cells = new ArrayList<>();
        resources = new ArrayList<>();
        for(int i=0; i<startingNrCells/2; ++i)
        {
            cells.add(new SexualCell(i*2,random.nextInt()%mapSize, random.nextInt()%mapSize));
            cells.add(new AsexualCell(i*2+1,random.nextInt()%mapSize, random.nextInt()%mapSize));
        }
        for(int i=0; i<startingNrResources; ++i)
        {
            resources.add(new Resource(i,random.nextInt()%mapSize, random.nextInt()%mapSize));
        }
    }
    public void FeedCell()
    {

    }
    public void KillCell()
    {

    }
    public void ReproduceCell()
    {

    }
    public void MoveCell()
    {

    }
    public static void main(String[] args)
    {
        SpringApplication.run(GameOfLifeApplication.class, args);
    }

}
