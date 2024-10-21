package com.example.gameoflife.application;

public class AsexualCell extends Cell {
    public AsexualCell(int id, int x, int y) {
        super(id, x, y);
    }

    @Override
    protected void foodRequest(Resource resource) {

    }

    @Override
    protected void dieRequest() {

    }

    @Override
    protected void reproduceRequest() {

    }

    @Override
    protected void moveRequest(int x, int y) {

    }
}
