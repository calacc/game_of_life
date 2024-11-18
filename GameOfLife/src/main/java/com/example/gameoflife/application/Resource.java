package com.example.gameoflife.application;

import jakarta.persistence.*;


public class Resource {

    public int ID;

    public int row;

    public int col;
    protected GameOfLife gameOfLife;

    public Resource(int ID, int row, int col) {
        this.ID = ID;
        this.row = row;
        this.col = col;
    }

    public Resource() {

    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public GameOfLife getGameOfLife() {
        return gameOfLife;
    }

    public void setGameOfLife(GameOfLife gameOfLife) {
        this.gameOfLife = gameOfLife;
    }
}
