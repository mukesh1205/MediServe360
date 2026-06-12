package com.medi360.DTO;
import java.time.LocalDateTime;

public class MedicalNoteResponseDTO {
    private Long noteId;
    private String patientName;
    private String doctorName;
    private String note;
    private LocalDateTime createdAt;

    public Long getNoteId() { return noteId; }
    public void setNoteId(Long noteId) { this.noteId = noteId; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String name) { this.patientName = name; }
    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String name) { this.doctorName = name; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}



