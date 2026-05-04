package com.example.Vault;


import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.Vault.Beans.Alien;
import com.example.Vault.Beans.users;
import com.example.Vault.Data.JPA;
import com.example.Vault.Service.AlienService;
import com.example.Vault.Service.usersService;


@SpringBootApplication
public class VaultApplication {

	public static void main(String[] args) {
		ApplicationContext context= SpringApplication.run(VaultApplication.class, args);
		
		
		AlienService as = context.getBean(AlienService.class);
		
		usersService us = context.getBean(usersService.class);
		
		List<users> userlist = us.getusers();
		for (users i: userlist) {
			System.out.print("\ni:" +i);
		}
		
	}

}
