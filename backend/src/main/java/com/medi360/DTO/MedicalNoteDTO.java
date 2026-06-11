package com.medi360.DTO;

public class MedicalNoteDTO {
    private int patientId;
    private int doctorId;
    private String note;

    public int getPatientId() { return patientId; }
    public void setPatientId(int patientId) { this.patientId = patientId; }
    public int getDoctorId() { return doctorId; }
    public void setDoctorId(int doctorId) { this.doctorId = doctorId; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}