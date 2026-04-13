package com.medi360.entities;


import java.util.Date;

import jakarta.persistence.Entity;

@Entity
public class KPIReport {
	
	private ComplianceReport report;
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
