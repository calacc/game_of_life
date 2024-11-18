package com.example.gameoflife.repositories;

import com.example.gameoflife.entities.CellEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CellRepository extends JpaRepository<CellEntity, Integer> {
}