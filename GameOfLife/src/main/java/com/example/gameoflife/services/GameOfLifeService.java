package com.example.gameoflife.services;

import com.example.gameoflife.application.Cell;
import com.example.gameoflife.application.GameOfLife;
import com.example.gameoflife.application.Resource;
import com.example.gameoflife.dto.CellDto;
import com.example.gameoflife.dto.GameOfLifeDto;
import com.example.gameoflife.dto.ResourceDto;
import com.example.gameoflife.entities.CellEntity;
import com.example.gameoflife.entities.GameOfLifeEntity;
import com.example.gameoflife.entities.ResourceEntity;
import com.example.gameoflife.repositories.CellRepository;
import com.example.gameoflife.repositories.GameOfLifeRepository;
import com.example.gameoflife.repositories.ResourceRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameOfLifeService {

    @Autowired
    private GameOfLifeRepository gameOfLifeRepository;

    @Autowired
    private CellRepository cellRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    private GameOfLife gameOfLife;

    public GameOfLife createGameOfLife() {
        if (this.gameOfLife == null) {
            this.gameOfLife = new GameOfLife();
        }
        return this.gameOfLife;
    }

    public void startGameOfLife() {
        if (this.gameOfLife != null) {
            gameOfLife.startGame();
        }
    }
    public void stopGameOfLife() {
        if (this.gameOfLife != null) {
            gameOfLife.stopGame();
        }
    }

    public void resetGameOfLife() {
        this.gameOfLife = null;
    }

    public boolean isGameOfLifeCreated() {
        return this.gameOfLife != null;
    }

    public GameOfLife getGameOfLife() {
        return this.gameOfLife;
    }

    public GameOfLifeEntity saveGameOfLife(GameOfLife gameOfLife) {
        GameOfLifeEntity gameOfLifeEntity = new GameOfLifeEntity();
        gameOfLifeEntity.setStarted(gameOfLife.isStarted());
        gameOfLifeEntity.setStartingNrCells(gameOfLife.getStartingNrCells());
        gameOfLifeEntity.setStartingNrResources(gameOfLife.getStartingNrResources());
        gameOfLifeEntity.setMapSize(gameOfLife.getMapSize());

        gameOfLifeEntity = gameOfLifeRepository.save(gameOfLifeEntity);

        for (Cell cell : gameOfLife.getCells()) {
            CellEntity cellEntity = new CellEntity();
            cellEntity.setX(cell.getX());
            cellEntity.setY(cell.getY());
            cellEntity.setT_Starve(cell.getT_Starve());
            cellEntity.setT_Full(cell.getT_Full());
            cellEntity.setFoodEaten(cell.getFoodEaten());
            cellEntity.setState(cell.getState());
            cellEntity.setGameOfLifeEntity(gameOfLifeEntity);
            cellRepository.save(cellEntity);
        }

        for (Resource resource : gameOfLife.getResources()) {
            ResourceEntity resourceEntity = new ResourceEntity();
            resourceEntity.setRow(resource.getRow());
            resourceEntity.setCol(resource.getCol());
            resourceEntity.setGameOfLifeEntity(gameOfLifeEntity);
            resourceRepository.save(resourceEntity);
        }

        return gameOfLifeEntity;
    }

    public GameOfLifeDto getGameOfLifeById(Long id) {
        GameOfLifeEntity gameOfLifeEntity = gameOfLifeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GameOfLife with ID " + id + " not found."));

        // Map the GameOfLifeEntity to GameOfLifeDto
        GameOfLifeDto gameOfLifeDto = new GameOfLifeDto();
        gameOfLifeDto.setId(gameOfLifeEntity.getId());
        gameOfLifeDto.setStarted(gameOfLifeEntity.isStarted());
        gameOfLifeDto.setStartingNrCells(gameOfLifeEntity.getStartingNrCells());
        gameOfLifeDto.setStartingNrResources(gameOfLifeEntity.getStartingNrResources());
        gameOfLifeDto.setMapSize(gameOfLifeEntity.getMapSize());

        // Map Cells
        List<CellDto> cellDtos = new ArrayList<>();
        for (CellEntity cellEntity : gameOfLifeEntity.getCells()) {
            CellDto cellDto = new CellDto();
            cellDto.setId(cellEntity.getID());
            cellDto.setX(cellEntity.getX());
            cellDto.setY(cellEntity.getY());
            cellDto.setT_Starve(cellEntity.getT_Starve());
            cellDto.setT_Full(cellEntity.getT_Full());
            cellDto.setFoodEaten(cellEntity.getFoodEaten());
            cellDto.setState(cellEntity.getState().name());  // Convert Enum to String
            cellDtos.add(cellDto);
        }
        gameOfLifeDto.setCells(cellDtos);

        // Map Resources
        List<ResourceDto> resourceDtos = new ArrayList<>();
        for (ResourceEntity resourceEntity : gameOfLifeEntity.getResources()) {
            ResourceDto resourceDto = new ResourceDto();
            resourceDto.setId(resourceEntity.getID());
            resourceDto.setRow(resourceEntity.getRow());
            resourceDto.setCol(resourceEntity.getCol());
            resourceDtos.add(resourceDto);
        }
        gameOfLifeDto.setResources(resourceDtos);
        return gameOfLifeDto;

    }
}
