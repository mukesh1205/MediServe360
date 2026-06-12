package com.medi360.controller;
import com.medi360.DTO.MedicalNoteDTO;
import com.medi360.DTO.MedicalNoteResponseDTO;
import com.medi360.service.MedicalNoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medical-notes")
public class MedicalNoteController {
    private final MedicalNoteService service;

    public MedicalNoteController(MedicalNoteService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<MedicalNoteResponseDTO> addNote(@RequestBody MedicalNoteDTO dto) {
        return ResponseEntity.ok(service.addNote(dto));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalNoteResponseDTO>> getByPatient(@PathVariable int patientId) {
        return ResponseEntity.ok(service.getNotesByPatient(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalNoteResponseDTO>> getByDoctor(@PathVariable int doctorId) {
        return ResponseEntity.ok(service.getNotesByDoctor(doctorId));
    }
    
    @PutMapping("/update/{noteId}")
    public ResponseEntity<MedicalNoteResponseDTO> updateNote(
            @PathVariable Long noteId,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(service.updateNote(noteId, body.get("note")));
    }

    @DeleteMapping("/delete/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
        service.deleteNote(noteId);
        return ResponseEntity.ok("Note deleted");
    }
    
}


