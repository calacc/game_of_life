package org.example.application;

public class AsexualCell extends Cell {
    public AsexualCell(int id, int x, int y, GameOfLife server) {
        super(id, x, y, server);
    }

    @Override
    protected void reproduceRequest() {
        int[] newPosition = findPositionNearby();

        if(newPosition != null) {
            int newId = gameServer.cells.size() + 1;
            gameServer.ReproduceCell(new AsexualCell(newId, newPosition[0], newPosition[1], gameServer));
        }
    }

    private int[] findPositionNearby() {
       int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

       for (int[] direction : directions) {
           int newX = x + direction[0];
           int newY = y + direction[1];

           if(newX > 0 && newY > 0 && newX < gameServer.mapSize && newY < gameServer.mapSize && gameServer.cellsMap[newX][newY] == 0) {
               return new int[]{newX, newY};
           }
       }

       return null;
    }
}
