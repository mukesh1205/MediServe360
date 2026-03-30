package com.medi360.WardBedManagenment.Ward;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ward {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int wardId;
	private String wardname;
	private int wardcapacity;
	private String wardstatus;
	public int getWardId() {
		return wardId;
	}
	public void setWardId(int wardId) {
		this.wardId = wardId;
	}
	public String getWardname() {
		return wardname;
	}
	public void setWardname(String wardname) {
		this.wardname = wardname;
	}
	public int getWardcapacity() {
		return wardcapacity;
	}
	public void setWardcapacity(int wardcapacity) {
		this.wardcapacity = wardcapacity;
	}
	public String getWardstatus() {
		return wardstatus;
	}
	public void setWardstatus(String wardstatus) {
		this.wardstatus = wardstatus;
	}
	public Ward(String wardname, int wardcapacity, String wardstatus) {
		super();
		this.wardname = wardname;
		this.wardcapacity = wardcapacity;
		this.wardstatus = wardstatus;
	}
	public Ward() {
		super();
	}
	
	
	
}
