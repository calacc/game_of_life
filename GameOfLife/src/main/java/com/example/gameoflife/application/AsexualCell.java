package com.example.gameoflife.application;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
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
            int newId = gameServer.cells.size() + 1;
            gameServer.ReproduceCell(new AsexualCell(newId, newPosition[0], newPosition[1], gameServer));
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

           if(newX >= 0 && newY >= 0 && newX < gameServer.mapSize && newY < gameServer.mapSize && gameServer.cellsMap[newX][newY] == 0) {
               return new int[]{newX, newY};
           }
       }

       return null;
    }
}
