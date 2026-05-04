package com.example.Vault.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Vault.Beans.Alien;
import com.example.Vault.Data.JPA;

@Component
public class AlienService {

	@Autowired
	JPA db;
	
	public List<Alien> getAlienDetails(){
		return db.findAll();
	}
}
