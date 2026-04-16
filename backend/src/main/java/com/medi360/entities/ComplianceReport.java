package com.medi360.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class ComplianceReport {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int reportId;
	
	private String reportScope;
	private String reportmatrics;
	private Date reportgeneratedDate;
	@OneToOne(cascade=CascadeType.ALL,mappedBy="report")
	private KPIReport report;
	public ComplianceReport() {
		super();
	}
	public ComplianceReport(String reportScope, String reportmatrics, Date reportgeneratedDate) {
		super();
		
		this.reportScope = reportScope;
		this.reportmatrics = reportmatrics;
		this.reportgeneratedDate = reportgeneratedDate;
	}
	public int getReportId() {
		return reportId;
	}
	public void setReportId(int reportId) {
		this.reportId = reportId;
	}
	public String getReportScope() {
		return reportScope;
	}
	public void setReportScope(String reportScope) {
		this.reportScope = reportScope;
	}
	public String getReportmatrics() {
		return reportmatrics;
	}
	public void setReportmatrics(String reportmatrics) {
		this.reportmatrics = reportmatrics;
	}
	public Date getReportgeneratedDate() {
		return reportgeneratedDate;
	}
	public void setReportgeneratedDate(Date reportgeneratedDate) {
		this.reportgeneratedDate = reportgeneratedDate;
	}
	
	
	
}
