package com.example.gameoflife.application;

import java.util.ArrayList;
import java.util.Random;

public class GameOfLife {
    protected int startingNrCells=10, startingNrResources=10, mapSize=20;
    protected ArrayList<Cell> cells;
    protected ArrayList<Resource> resources;
    public GameOfLife()
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
        System.out.println();
        System.out.println("GameOfLife instance created");
        System.out.println("Starting Nr Cells: " + startingNrCells);
        System.out.println("Starting Nr Resources: " + startingNrResources);
        System.out.println("Map size: " + mapSize);
        System.out.println();
    }
    public void FeedCell()
    {
        System.out.println("Feeding cell");
    }
    public void KillCell()
    {
        System.out.println("Killing cell");
    }
    public void ReproduceCell()
    {
        System.out.println("Reproducing cell");
    }
    public void MoveCell()
    {
        System.out.println("Moving cell");
    }
}
