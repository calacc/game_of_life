package com.example.gameoflife.application;

public abstract class Cell {
    protected int ID;
    protected int x;
    protected int y;
    protected int T_Starve;
    protected int T_Full;
    protected State state;
    protected int foodEaten;

    protected abstract void foodRequest(Resource resource);
    protected abstract void dieRequest();
    protected abstract void reproduceRequest();
    protected abstract void moveRequest(int x, int y);
    public Cell(int id, int x, int y)
    {
        this.ID = id;
        this.x=x;
        this.y=y;
    }
}
