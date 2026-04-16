package com.medi360.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medi360.entities.Bed;

@Repository
public interface BedRepository extends JpaRepository<Bed, Integer> {

}
