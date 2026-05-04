package com.example.Vault.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Vault.Beans.users;

@Repository
public interface userData extends JpaRepository<users, Integer> {

}
