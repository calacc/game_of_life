package org.example.application;

import java.util.ArrayList;
import java.util.Random;

public class GameOfLife {
    private boolean started = false;
    protected int startingNrCells=10, startingNrResources=10, mapSize=20;
    protected ArrayList<Cell> cells;
    protected ArrayList<Resource> resources;
    protected int cellsMap[][], resourcesMap[][];
    public GameOfLife()
    {
        Random random = new Random();
        cells = new ArrayList<>();
        resources = new ArrayList<>();
        cellsMap = new int[mapSize+5][mapSize+5];
        resourcesMap = new int[mapSize+5][mapSize+5];

        for(int i=0; i<startingNrCells/2; ++i)
        {
            Cell newSCell = new SexualCell(i*2,Math.abs(random.nextInt()%mapSize), Math.abs(random.nextInt()%mapSize));
            new Thread(() -> cells.add(newSCell)).start();
            cellsMap[newSCell.x][newSCell.y] = 1;

            Cell newACell = new AsexualCell(i*2+1,Math.abs(random.nextInt()%mapSize), Math.abs(random.nextInt()%mapSize));
            new Thread(() -> cells.add(newACell)).start();
            cellsMap[newACell.x][newACell.y] = 1;
        }
        for(int i=0; i<startingNrResources; ++i)
        {
            Resource resource = new Resource(i,Math.abs(random.nextInt()%mapSize), Math.abs(random.nextInt()%mapSize)   );
            resources.add(resource);
            resourcesMap[resource.row][resource.col] = 1;
        }

        System.out.println();
        System.out.println("GameOfLife instance created");
        System.out.println("Starting Nr Cells: " + startingNrCells);
        System.out.println("Starting Nr Resources: " + startingNrResources);
        System.out.println("Map size: " + mapSize);
        System.out.println();

        System.out.println("Cells map:");
        for(int i=0; i<mapSize; ++i)
        {
            for(int j=0; j<mapSize; ++j)
                System.out.print(cellsMap[i][j]);
            System.out.println("");
        }
        System.out.println("Resources map:");
        for(int i=0; i<mapSize; ++i)
        {
            for(int j=0; j<mapSize; ++j)
                System.out.print(resourcesMap[i][j]);
            System.out.println("");
        }
    }
    public void startGame() {
        System.out.println("Game of life started");
        this.started = true;
        while(this.started) {
            // IN WHILE-UL ASTA MERGE JOCU CUM AR VENI
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Game of life is running...");
        }
        System.out.println("Game of life stopped");
    }
    public void stopGame() {
        this.started = false;
    }
    public synchronized void FeedCell()
    {
        System.out.println("Feeding cell");
    }
    public void KillCell()
    {
        System.out.println("Killing cell");
    }
    public synchronized void ReproduceCell()
    {
        System.out.println("Reproducing cell");
    }
    public synchronized void MoveCell()
    {
        System.out.println("Moving cell");
    }
}
