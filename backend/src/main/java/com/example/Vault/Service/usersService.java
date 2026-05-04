package com.example.Vault.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Vault.Beans.users;
import com.example.Vault.Data.userData;

@Component
public class usersService {
	
	@Autowired
	userData usersdb;
	

	
	public List<users> getusers() {
		
		return usersdb.findAll();
	}
	
	// user verification service
	public Boolean userverification(String email, String password) {
		
		System.out.print("\n email in Service: "+email);
		System.out.print("\n password in Service: "+ password);
		
		List<users> userdetails = usersdb.findAll();
		
		for (users u: userdetails) {
			
			if ((u.getEmail().equals(email)) &&  (u.getPassword().equals(password))) {
				System.out.println("user verified: "+true);
				return true;
				
			}
		}
		
		return false;
	}

}
