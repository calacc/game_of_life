package com.example.gameoflife.application;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GameOfLife {

    private Long id;
    protected boolean started = false;
    protected int startingNrCells = 2;
    protected int startingNrResources = 15;
    protected int mapSize = 4;


    protected List<Cell> cells = new ArrayList<>();

    protected List<Resource> resources = new ArrayList<>();

    // Assuming cellsMap and resourcesMap are not stored directly in the database;
    // they might need to be generated on each game load if required.
    protected int[][] cellsMap;

    protected int[][] resourcesMap;

    public GameState getState() {
        GameState state = new GameState();
        state.map = this.cellsMap;
        state.started = this.started;
        state.cells = this.cells.size();
        state.resources = this.resources.size();
        state.activeCells = this.cells.stream().map(c -> {
            CellState cellState = new CellState();
            cellState.x = c.x;
            cellState.y = c.y;
            return cellState;
        }).toArray(CellState[]::new);
        return state;
    }

    public GameOfLife() {
        Random random = new Random();
        cells = new ArrayList<>();
        resources = new ArrayList<>();
        cellsMap = new int[mapSize + 5][mapSize + 5];
        resourcesMap = new int[mapSize + 5][mapSize + 5];

        for (int i = 0; i < startingNrCells / 2; ++i) {
            Cell newSCell1 = new SexualCell(i * 2, Math.abs(random.nextInt() % mapSize), Math.abs(random.nextInt() % mapSize), this);
            cells.add(newSCell1);
            cellsMap[newSCell1.x][newSCell1.y] = 1;

            Cell newSCell2 = new SexualCell(i * 2 + 1, Math.abs(random.nextInt() % mapSize), Math.abs(random.nextInt() % mapSize), this);
            cells.add(newSCell2);
            cellsMap[newSCell2.x][newSCell2.y] = 1;

            Cell newSCell3 = new SexualCell(i * 2 + 2, Math.abs(random.nextInt() % mapSize), Math.abs(random.nextInt() % mapSize), this);
            cells.add(newSCell3);
            cellsMap[newSCell3.x][newSCell3.y] = 1;
        }

        for (int i = 0; i < startingNrResources; ++i) {
            Resource resource = new Resource(i, Math.abs(random.nextInt() % mapSize), Math.abs(random.nextInt() % mapSize));
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
        for (int i = 0; i < mapSize; ++i) {
            for (int j = 0; j < mapSize; ++j)
                System.out.print(cellsMap[i][j]);
            System.out.println();
        }
        System.out.println("Resources map:");
        for (int i = 0; i < mapSize; ++i) {
            for (int j = 0; j < mapSize; ++j)
                System.out.print(resourcesMap[i][j]);
            System.out.println();
        }
    }

    public void startGame() {
        System.out.println("Game of life started");
        this.started = true;

        for(Cell cell : cells) {
            new Thread(cell).start();
        }

        while (this.started) {
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

    public synchronized boolean FeedCell(int x, int y) {
        if (resourcesMap[x][y] == 1) {
            System.out.println("Feeding cell");
            resourcesMap[x][y] = 0;
            return true;
        } else {
            return false;
        }
    }

    public boolean KillCell(int x, int y) {
        System.out.println("Killing cell");
        Random random = new Random();
        cellsMap[x][y] = 0;
        for (int i = 0; i < random.nextInt() % 5; ++i) {
            Resource resource = new Resource(i, Math.abs(random.nextInt() % mapSize), Math.abs(random.nextInt() % mapSize));
            resources.add(resource);
            resourcesMap[resource.row][resource.col] = 1;
        }
        return true;
    }

    public synchronized void ReproduceCell(Cell cell) {
        System.out.println("Reproducing cell");
        cells.add(cell);
        cellsMap[cell.x][cell.y] = 1;
        new Thread(cell).start();
    }

    public synchronized int[] MoveCell(int x, int y) {
        int[] position = new int[2];
        Random random = new Random();
        int newX = random.nextInt() % 2, newY = random.nextInt() % 2;

        cellsMap[x][y] = 0;
//        System.out.println("Moving cell from position: [" + x + "][" + y +"]");
        while(x + newX >= mapSize || x + newX < 0 || y + newY >= mapSize || y + newY < 0) {
            newX = random.nextInt() % 2;
            newY = random.nextInt() % 2;
        }
        x = x + newX;
        y = y + newY;
        cellsMap[x][y] = 1;
        position[0] = x;
        position[1] = y;
        return position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public int getStartingNrCells() {
        return startingNrCells;
    }

    public void setStartingNrCells(int startingNrCells) {
        this.startingNrCells = startingNrCells;
    }

    public int getStartingNrResources() {
        return startingNrResources;
    }

    public void setStartingNrResources(int startingNrResources) {
        this.startingNrResources = startingNrResources;
    }

    public int getMapSize() {
        return mapSize;
    }

    public void setMapSize(int mapSize) {
        this.mapSize = mapSize;
    }

    public List<Cell> getCells() {
        return cells;
    }

    public void setCells(List<Cell> cells) {
        this.cells = cells;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

    public int[][] getCellsMap() {
        return cellsMap;
    }

    public void setCellsMap(int[][] cellsMap) {
        this.cellsMap = cellsMap;
    }

    public int[][] getResourcesMap() {
        return resourcesMap;
    }

    public void setResourcesMap(int[][] resourcesMap) {
        this.resourcesMap = resourcesMap;
    }
}
