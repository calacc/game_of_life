package com.example.gameoflife.entities;

import com.example.gameoflife.application.GameOfLife;
import jakarta.persistence.*;

@Entity
public class ResourceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int ID;
    public int row;
    public int col;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_of_life_entity_id", referencedColumnName = "id")
    protected GameOfLifeEntity gameOfLifeEntity;

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

    public GameOfLifeEntity getGameOfLifeEntity() {
        return gameOfLifeEntity;
    }

    public void setGameOfLifeEntity(GameOfLifeEntity gameOfLifeEntity) {
        this.gameOfLifeEntity = gameOfLifeEntity;
    }
}
