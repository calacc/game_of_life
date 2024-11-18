package com.example.gameoflife.repositories;

import com.example.gameoflife.entities.GameOfLifeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameOfLifeRepository extends JpaRepository<GameOfLifeEntity, Long> {
}