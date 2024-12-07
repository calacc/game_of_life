package com.example.gameoflife.application;

import jakarta.persistence.*;

import java.util.concurrent.TimeUnit;


public abstract class Cell implements Runnable{

    protected int ID;
    protected int x;
    protected int y;
    protected int T_Starve;
    protected int T_Full;
    protected int foodEaten;
    protected boolean isAlive;

    protected State state;

    protected GameOfLife gameOfLife;

    public Cell() {

    }

    protected synchronized boolean foodRequest()
    {
//        System.out.println("Food request from cell with id: " + ID);
        return gameOfLife.FeedCell(x, y);
    }
    protected synchronized boolean dieRequest() {
//        System.out.println("Kill request from cell with id: " + ID);
        return gameOfLife.KillCell(x, y);
    }
    protected synchronized void moveRequest()
    {
        int[] updatedPosition = new int[2];
        updatedPosition = gameOfLife.MoveCell(x, y);
        x = updatedPosition[0];
        y = updatedPosition[1];
//        System.out.println("Cell with id " + ID + " moved to position: [" + x + "][" + y +"]");
    }

    protected abstract void reproduceRequest();

    public Cell(int id, int x, int y, GameOfLife gameOfLifeServer)
    {
        this.ID = id;
        this.x = x;
        this.y = y;
        this.gameOfLife = gameOfLifeServer;

        /*TBD if T_starve and T_full are equal for every cell or personalized*/
        /*
            Le las pe amandoua 20. Se mai intampla sa imi dea un numar gen 1 sau 2 daca le las random si moare pana apuca sa faca ceva
            20 e destul cat sa nu moara si sa se mai intalneasca intre ele
         */
        this.T_Full = 20;
        this.T_Starve = 20;
        this.foodEaten = 0;
        this.state = State.HUNGRY;
        this.isAlive = true;
    }
    public void run() {
        int time_counter = 0;
        /*while cell is alive*/
        while(true && gameOfLife.started)
        {
            moveRequest();
            time_counter++;
            /*evaluate state of cell*/
            switch(state)
            {
                case HUNGRY:
                {
                    if(foodRequest())
                    {
                        foodEaten++;
                        state = State.FULL;
                        time_counter = 0;
                    }
                    else
                    {
                        if(time_counter == T_Starve)
                        {
                            if(dieRequest())
                            {
                                isAlive = false;
                                return;
                            }
                        }
                    }

                    break;
                }
                case FULL: {
                    if (time_counter == T_Full) {
                        time_counter = 0;
                        state = State.HUNGRY;
                    }

                    break;
                }
            }
            if(foodEaten >= 10)
            {
                /*if multiply request successful -> getting hungry again*/
                reproduceRequest();
            }
            try {
                TimeUnit.SECONDS.sleep(1);
            }
            catch(Exception e)
            {
                System.out.println("thread.sleep was not successful");
            }
        }
    }

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

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    public void setState(State state) {
        this.state = state;
    }

    public GameOfLife getGameOfLife() {
        return gameOfLife;
    }

    public void setGameOfLife(GameOfLife gameOfLife) {
        this.gameOfLife = gameOfLife;
    }
}
