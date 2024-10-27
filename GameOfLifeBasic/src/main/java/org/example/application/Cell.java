package org.example.application;

import java.util.Random;
import java.util.concurrent.TimeUnit;

public abstract class Cell {
    protected int ID;
    protected int x;
    protected int y;
    protected int T_Starve;
    protected int T_Full;
    protected State state;
    protected int foodEaten;

    protected int foodRequest(Resource resource)
    {
        return 0;
    }
    protected void dieRequest() {

    }
    protected void moveRequest(int x, int y)
    {

    }
    public Cell(int id, int x, int y)
    {
        this.ID = id;
        this.x=x;
        this.y=y;

        //trebuie sa ne decidem daca t_full si t_starve sunt la fel la toate celulele sau sunt personalizate
        this.T_Full = (new Random()).nextInt()%10;
        this.T_Starve = (new Random()).nextInt()%10;
        this.foodEaten = 0;
        this.state = State.HUNGRY;

        run();
    }
    public void run() {
        int time_counter = 0;
        while(true) // mai degraba while alive
        {
            //evaluate state -> request from server in functie de state

            time_counter++;
            try {
                TimeUnit.SECONDS.sleep(1);
            }
            catch(Exception e)
            {
                System.out.println("nu inteleg de ce sleep necesita try catch - daca stiti cum se evita asta feel free to modify");
            }
        }
    }
    protected abstract void reproduceRequest();
}
