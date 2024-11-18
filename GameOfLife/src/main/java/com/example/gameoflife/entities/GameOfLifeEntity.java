package com.example.gameoflife.entities;

import com.example.gameoflife.application.Cell;
import com.example.gameoflife.application.Resource;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class GameOfLifeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    protected boolean started = false;
    protected int startingNrCells = 2;
    protected int startingNrResources = 15;
    protected int mapSize = 4;

    @OneToMany(mappedBy = "gameOfLifeEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    protected List<CellEntity> cells = new ArrayList<>();

    @OneToMany(mappedBy = "gameOfLifeEntity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    protected List<ResourceEntity> resources = new ArrayList<>();

    public List<ResourceEntity> getResources() {
        return resources;
    }

    public void setResources(List<ResourceEntity> resources) {
        this.resources = resources;
    }

    public List<CellEntity> getCells() {
        return cells;
    }

    public void setCells(List<CellEntity> cells) {
        this.cells = cells;
    }

    public int getMapSize() {
        return mapSize;
    }

    public void setMapSize(int mapSize) {
        this.mapSize = mapSize;
    }

    public int getStartingNrResources() {
        return startingNrResources;
    }

    public void setStartingNrResources(int startingNrResources) {
        this.startingNrResources = startingNrResources;
    }

    public int getStartingNrCells() {
        return startingNrCells;
    }

    public void setStartingNrCells(int startingNrCells) {
        this.startingNrCells = startingNrCells;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}