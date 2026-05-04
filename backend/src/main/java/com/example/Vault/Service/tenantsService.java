package com.example.Vault.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Vault.Beans.tenants;
import com.example.Vault.Data.tenantsData;

@Component
public class tenantsService {
	
	@Autowired
	tenantsData tenantsdb;
	
	public List<tenants> gettenants(){
		return tenantsdb.findAll();	
	}
	

}
