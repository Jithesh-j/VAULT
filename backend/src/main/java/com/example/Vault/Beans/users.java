package com.example.Vault.Beans;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class users {
	@Id
	private int id;
	private String email;
	private String password;
	@ManyToOne
	@JoinColumn(name = "tenant_id")
	private tenants tenant;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public users() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "users [id=" + id + ", email=" + email + ", password=" + password + ", tenant=" + tenant + "]";
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public tenants getTenant() {
		return tenant;
	}
	public void setTenant(tenants tenant) {
		this.tenant = tenant;
	}

}
