package org.example.application;

public class AsexualCell extends Cell {
    public AsexualCell(int id, int x, int y, GameOfLife server) {
        super(id, x, y, server);
    }

    @Override
    protected void reproduceRequest() {

    }
}
