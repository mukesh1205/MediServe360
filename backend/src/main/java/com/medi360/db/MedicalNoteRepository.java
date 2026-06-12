package com.medi360.db;
import com.medi360.entities.MedicalNote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicalNoteRepository extends JpaRepository<MedicalNote, Long> {
    List<MedicalNote> findByPatient_PatientId(int patientId);
    List<MedicalNote> findByDoctor_Id(int doctorId);
}





