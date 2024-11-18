package com.example.gameoflife.repositories;

import com.example.gameoflife.entities.ResourceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<ResourceEntity, Integer> {
}