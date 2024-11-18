package com.example.gameoflife.entities;

import com.example.gameoflife.application.GameOfLife;
import com.example.gameoflife.application.State;
import jakarta.persistence.*;

@Entity
public class CellEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int ID;
    protected int x;
    protected int y;
    protected int T_Starve;
    protected int T_Full;
    protected int foodEaten;

    @Enumerated(EnumType.STRING)
    protected State state;

    @ManyToOne
    @JoinColumn(name = "game_of_life_entity_id", nullable = false)
    protected GameOfLifeEntity gameOfLifeEntity;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getT_Starve() {
        return T_Starve;
    }

    public void setT_Starve(int t_Starve) {
        T_Starve = t_Starve;
    }

    public int getT_Full() {
        return T_Full;
    }

    public void setT_Full(int t_Full) {
        T_Full = t_Full;
    }

    public int getFoodEaten() {
        return foodEaten;
    }

    public void setFoodEaten(int foodEaten) {
        this.foodEaten = foodEaten;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public GameOfLifeEntity getGameOfLifeEntity() {
        return gameOfLifeEntity;
    }

    public void setGameOfLifeEntity(GameOfLifeEntity gameOfLifeEntity) {
        this.gameOfLifeEntity = gameOfLifeEntity;
    }
}
