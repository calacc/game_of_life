package com.example.gameoflife.dto;

import java.util.List;

public class GameOfLifeDto {
    private Long id;
    private boolean started;
    private int startingNrCells;
    private int startingNrResources;
    private int mapSize;
    private List<CellDto> cells;
    private List<ResourceDto> resources;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public int getStartingNrCells() {
        return startingNrCells;
    }

    public void setStartingNrCells(int startingNrCells) {
        this.startingNrCells = startingNrCells;
    }

    public int getStartingNrResources() {
        return startingNrResources;
    }

    public void setStartingNrResources(int startingNrResources) {
        this.startingNrResources = startingNrResources;
    }

    public int getMapSize() {
        return mapSize;
    }

    public void setMapSize(int mapSize) {
        this.mapSize = mapSize;
    }

    public List<CellDto> getCells() {
        return cells;
    }

    public void setCells(List<CellDto> cells) {
        this.cells = cells;
    }

    public List<ResourceDto> getResources() {
        return resources;
    }

    public void setResources(List<ResourceDto> resources) {
        this.resources = resources;
    }

}