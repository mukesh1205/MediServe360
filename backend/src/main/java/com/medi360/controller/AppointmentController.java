package com.medi360.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medi360.entities.Appointment;
import com.medi360.exception.AppointmentNotFoundException;
import com.medi360.exception.DoctorNotFoundException;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.exception.SlotNotAvailableException;
import com.medi360.DTO.AppointmentDTO;
import com.medi360.DTO.AppointmentResponseDTO;
import com.medi360.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    
    //Add Appointment
    @PostMapping("/add")
    public ResponseEntity<AppointmentResponseDTO> addAppointment(@RequestBody AppointmentDTO appointmentDTO) 
        throws PatientNotFoundException,
               DoctorNotFoundException,
               SlotNotAvailableException 
{
    		System.out.println("okk");
        Appointment appointment =
                appointmentService.addAppointment(appointmentDTO.getAppointment());

        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setAppointment(appointment);
        dto.setStatusCode(201);
        

        //Message includes scheduled slot
        if ("RESCHEDULED".equalsIgnoreCase(appointment.getStatus())) {

            String start = appointment.getTime().toString();
            String end = appointment.getTime()
                    .plusMinutes(appointment.getDurationMinutes())
                    .toString();

            dto.setWasRescheduled(true);
            dto.setMessage(
                "Requested slot was unavailable. Appointment scheduled on "
                + appointment.getDate()
                + " from " + start + " to " + end + "."
            );

        } else {
            dto.setWasRescheduled(false);
            dto.setMessage("Appointment created successfully");
        }

        return ResponseEntity.status(201).body(dto);
    }


    
    //Update Appointment
    @PutMapping("/update")
    public ResponseEntity<AppointmentResponseDTO> updateAppointment(
            @RequestBody AppointmentDTO appointmentDTO)
            throws AppointmentNotFoundException,
                   PatientNotFoundException,
                   DoctorNotFoundException,
                   SlotNotAvailableException
{

        Appointment appointment =
                appointmentService.updateAppointment(appointmentDTO.getAppointment());

        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setAppointment(appointment);
        dto.setStatusCode(200);

        if ("RESCHEDULED".equalsIgnoreCase(appointment.getStatus())) {

            String start = appointment.getTime().toString();
            String end = appointment.getTime()
                    .plusMinutes(appointment.getDurationMinutes())
                    .toString();

            dto.setWasRescheduled(true);
            dto.setMessage(
                "Appointment rescheduled on "
                + appointment.getDate()
                + " from " + start + " to " + end + "."
            );

        } else {
            dto.setWasRescheduled(false);
            dto.setMessage("Appointment updated successfully");
        }

        return ResponseEntity.ok(dto);
    }

    
    //Delete appointment
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable int id) throws AppointmentNotFoundException {

        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }

    
    //Get appointment by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<AppointmentResponseDTO> getAppointmentById(@PathVariable int id) throws AppointmentNotFoundException
    {

        Appointment appointment = appointmentService.getAppointmentById(id);

        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setAppointment(appointment);
        dto.setStatusCode(200);
        dto.setMessage("Appointment fetched successfully");

        return ResponseEntity.ok(dto);
    }

    
    //Get all appointments 
    @GetMapping("/getAll")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    
    
    //Get all appointments with pagination + sorting
    @GetMapping("/getAllPaginated")
    public Page<Appointment> getAllAppointmentsWithPagination(
            @RequestParam(name = "pgno") int pgno,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "sorting") String sorting,
            @RequestParam(name = "asc") boolean asc) {

        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();

        Pageable pageable = PageRequest.of(pgno, size, sort);

        return appointmentService.getAllAppointmentsWithPagination(pageable);
    }
    
    
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(
            @PathVariable int doctorId)
            throws DoctorNotFoundException {

        List<Appointment> appointments =
                appointmentService.getAppointmentsByDoctorId(doctorId);

        return ResponseEntity.ok(appointments);
    }
    
    
    @GetMapping("/doctor/{doctorId}/date")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorAndDate(
            @PathVariable int doctorId,
            @RequestParam LocalDate date)
            throws DoctorNotFoundException {

        List<Appointment> appointments =
                appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);

        return ResponseEntity.ok(appointments);
    }


    
}







