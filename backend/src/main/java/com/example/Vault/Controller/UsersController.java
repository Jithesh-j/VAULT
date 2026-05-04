package com.example.Vault.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Vault.Beans.tenants;
import com.example.Vault.Beans.users;
import com.example.Vault.Service.tenantsService;
import com.example.Vault.Service.usersService;

@RestController
public class UsersController {
	
	@Autowired
	usersService userservice;
	
	@Autowired
	tenantsService tenantservice;
		
	@GetMapping("/loginusers")
	@CrossOrigin
	@ResponseBody
	public List<users> loginusers() {		
		return userservice.getusers();

	}
	
	// Login verification service API
	@PostMapping("/login")
	@CrossOrigin
	@ResponseBody
	public Boolean loginuserverification(@RequestBody users u) {
		System.out.print("\nemail in Controller: "+ u.getEmail());
		System.out.print("\n password in Controller: "+ u.getPassword());
		
		
		
		return userservice.userverification(u.getEmail(), u.getPassword());

	}
	
	
	@GetMapping("/tenantdetails")
	@CrossOrigin
	@ResponseBody
	public List<tenants> tenandetails(){
		return tenantservice.gettenants();
		
	}
	
}
