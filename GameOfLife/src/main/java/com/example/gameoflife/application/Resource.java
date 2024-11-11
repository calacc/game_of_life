package com.example.gameoflife.application;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Resource {
    @Id
    private int ID;
    public int row;
    public int col;

    public Resource(int ID, int row, int col) {
        this.ID = ID;
        this.row = row;
        this.col = col;
    }

    public Resource() {

    }

}
