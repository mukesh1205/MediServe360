package com.medi360.entities;


import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class KPIReport {
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="reportID")
	private ComplianceReport report;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int KPIId;
	private String KPIReportScope;
	private String KPImetrics;
	private Date KPIgeneratedDate;
	public KPIReport() {
		super();
	}
	public KPIReport(ComplianceReport report, String kPIReportScope, String kPImetrics, Date kPIgeneratedDate) {
		super();
		this.report = report;
		KPIReportScope = kPIReportScope;
		KPImetrics = kPImetrics;
		KPIgeneratedDate = kPIgeneratedDate;
	}
	public ComplianceReport getReport() {
		return report;
	}
	public void setReport(ComplianceReport report) {
		this.report = report;
	}
	public String getKPIReportScope() {
		return KPIReportScope;
	}
	public void setKPIReportScope(String kPIReportScope) {
		KPIReportScope = kPIReportScope;
	}
	public String getKPImetrics() {
		return KPImetrics;
	}
	public void setKPImetrics(String kPImetrics) {
		KPImetrics = kPImetrics;
	}
	public Date getKPIgeneratedDate() {
		return KPIgeneratedDate;
	}
	public void setKPIgeneratedDate(Date kPIgeneratedDate) {
		KPIgeneratedDate = kPIgeneratedDate;
	}
	
	
}
