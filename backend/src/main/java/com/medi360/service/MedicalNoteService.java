package com.medi360.service;
import com.medi360.DTO.MedicalNoteDTO;
import com.medi360.DTO.MedicalNoteResponseDTO;
import com.medi360.db.MedicalNoteRepository;
import com.medi360.db.PatientRepository;
import com.medi360.db.DoctorRepository;
import com.medi360.entities.MedicalNote;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalNoteService {
    private final MedicalNoteRepository repo;
    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;

    public MedicalNoteService(MedicalNoteRepository repo, PatientRepository patientRepo, DoctorRepository doctorRepo) {
        this.repo = repo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    public MedicalNoteResponseDTO addNote(MedicalNoteDTO dto) {
        MedicalNote note = new MedicalNote();
        note.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow());
        note.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow());
        note.setNote(dto.getNote());
        MedicalNote saved = repo.save(note);
        return toDTO(saved);
    }

    public List<MedicalNoteResponseDTO> getNotesByPatient(int patientId) {
        return repo.findByPatient_PatientId(patientId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<MedicalNoteResponseDTO> getNotesByDoctor(int doctorId) {
        return repo.findByDoctor_Id(doctorId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    private MedicalNoteResponseDTO toDTO(MedicalNote n) {
        MedicalNoteResponseDTO dto = new MedicalNoteResponseDTO();
        dto.setNoteId(n.getNoteId());
        dto.setNote(n.getNote());
        dto.setCreatedAt(n.getCreatedAt());
        dto.setPatientName(n.getPatient().getPatientName());
        dto.setDoctorName(n.getDoctor().getName());
        return dto;
    }
    
    public MedicalNoteResponseDTO updateNote(Long noteId, String note) {
        MedicalNote n = repo.findById(noteId).orElseThrow();
        n.setNote(note);
        return toDTO(repo.save(n));
    }

    public void deleteNote(Long noteId) {
        repo.deleteById(noteId);
    }
     
}






