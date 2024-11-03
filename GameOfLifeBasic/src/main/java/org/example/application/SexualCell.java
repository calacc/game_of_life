package org.example.application;

import java.util.concurrent.locks.ReentrantLock;

public class SexualCell extends Cell{
    private boolean seekingMate = false;
    private final ReentrantLock lock = new ReentrantLock();

    public SexualCell(int id, int x, int y, GameOfLife server) {
        super(id, x, y, server);
    }

    @Override
    protected void reproduceRequest() {
        System.out.println("Reproduce request from cell with id: " + ID);
        lock.lock();
        try{
            seekingMate = true;
            Cell partner = findMate();

            if (partner != null) {
                SexualCell sexualPartner = (SexualCell) partner;

                if(sexualPartner.lock.tryLock()) {
                    try{
                        if(sexualPartner.seekingMate) {
                            int[] newPosition = findEmptyPositionNearby();

                            if(newPosition != null) {
                                synchronized (gameServer) {
                                    int newId = gameServer.cells.size() + 1;
                                    gameServer.ReproduceCell(new SexualCell(newId, newPosition[0], newPosition[1], gameServer));
                                }

                                this.foodEaten = 0;
                                this.seekingMate = false;
                                sexualPartner.foodEaten = 0;
                                sexualPartner.seekingMate = false;
                            }
                        }
                    } finally {
                        sexualPartner.lock.unlock();
                    }
                }
            }
        } finally {
            lock.unlock();
        }
    }

    private Cell findMate() {
        for(Cell cell : gameServer.cells) {
            if(this.x == cell.x && this.y == cell.y && this.ID != cell.ID && cell instanceof SexualCell && ((SexualCell) cell).seekingMate) {
                return cell;
            }
        }
        return null;
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
