package com.example.Vault.Beans;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class tenants {
	@Id
	private String id;
	
	private String name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public tenants() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "tenants [id=" + id + ", name=" + name + "]";
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
