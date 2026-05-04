package com.example.Vault.Beans;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Alien {
	
	@Id
	int aid;
	String color;
	String name;
	
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Alien(int aid, String color, String name) {
		super();
		this.aid = aid;
		this.color = color;
		this.name = name;
	}
	@Override
	public String toString() {
		return "AlienBean [aid=" + aid + ", color=" + color + ", name=" + name + "]";
	}
	public Alien() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
