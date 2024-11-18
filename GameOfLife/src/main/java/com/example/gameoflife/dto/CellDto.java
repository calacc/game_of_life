package com.example.gameoflife.dto;

public class CellDto {
    private int id;
    private int x;
    private int y;
    private int T_Starve;
    private int T_Full;
    private int foodEaten;
    private String state;  // Representing Enum as String

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}