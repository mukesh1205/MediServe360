package com.medi360.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medi360.entities.User;

public interface UserRepository extends JpaRepository<User,Integer>{

}
