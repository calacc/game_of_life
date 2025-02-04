package com.example.gameoflife.application;

public class AsexualCell extends Cell {
    public AsexualCell(int id, int x, int y, GameOfLife server) {
        super(id, x, y, server);
    }

    protected AsexualCell() {
        super();
    }

    @Override
    protected void reproduceRequest() {
        int[] newPosition = findEmptyPositionNearby();

        if(newPosition != null) {
            int newId = gameOfLife.cells.size() + 1;
            gameOfLife.ReproduceCell(new AsexualCell(newId, newPosition[0], newPosition[1], gameOfLife));
            this.foodEaten = 0;
            this.state = State.HUNGRY;
        }
    }

    @SuppressWarnings("DuplicatedCode")
    private int[] findEmptyPositionNearby() {
       int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

       for (int[] direction : directions) {
           int newX = x + direction[0];
           int newY = y + direction[1];

           if(newX >= 0 && newY >= 0 && newX < gameOfLife.mapSize && newY < gameOfLife.mapSize && gameOfLife.cellsMap[newX][newY] == 0) {
               return new int[]{newX, newY};
           }
       }

       return null;
    }
}
