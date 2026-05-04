package com.example.Vault.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Vault.Beans.Alien;

@Repository
public interface JPA  extends JpaRepository<Alien, Integer>{

}
