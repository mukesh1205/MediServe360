/*

package com.medi360.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medi360.entities.Appointment;
import com.medi360.DTO.AppointmentDTO;
import com.medi360.DTO.AppointmentResponseDTO;
import com.medi360.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
	
	private final AppointmentService appointmentService;
	
	public AppointmentController (AppointmentService appointmentService) {
		this.appointmentService = appointmentService;
	}
	
	@PostMapping("/add")
	public ResponseEntity<AppointmentResponseDTO> addAppointment(@RequestBody AppointmentDTO appointmentDTO) {
		
		Appointment appointment = appointmentService.addAppointment(appointmentDTO.getAppointment());
		AppointmentResponseDTO dto = new AppointmentResponseDTO();
		dto.setAppointment(appointment);
		dto.setStatusCode(201);
		dto.setMessage("Appointment created successfully");
		
		return ResponseEntity.status(201).body(dto);
	}
	
	@PutMapping("/update")
	public ResponseEntity <AppointmentResponseDTO> updateAppointment(@RequestBody AppointmentDTO appointmentDTO) {
		
		Appointment appointment = appointmentService.updateAppointment(appointmentDTO.getAppointment());
		AppointmentResponseDTO dto = new AppointmentResponseDTO();
		dto.setAppointment(appointment);
		dto.setStatusCode(200);
		dto.setMessage("Appointment updated successfully");
		
		return ResponseEntity.ok(dto);
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteAppointment(@PathVariable int id) {
		
		appointmentService.deleteAppointment(id);
		return ResponseEntity.ok("Appointment deleted successfully");
		
	}
	
	@GetMapping("/get/{id}")
	public Appointment getAppointmentById(@PathVariable int id) {
		return appointmentService.getAppointmentById(id);
	}
	
	@GetMapping("/getAll")
	public List <Appointment> getAllAppointments() {
		return appointmentService.getAllAppointments();
	}
	
	@GetMapping("/getAllPaginated")
	public Page<Appointment> getAllAppointmentsWithPagination(@RequestParam (name = "pgno") int pgno, 
			                                                  @RequestParam (name = "size") int size, 
			                                                  @RequestParam (name = "sorting") String sorting, 
			                                                  @RequestParam (name = "asc") boolean asc) 
	{
		
	Sort sort = asc ? Sort.by(sorting).ascending() : Sort.by(sorting).descending();
	
	Pageable pageable = PageRequest.of(pgno, size, sort);
	return appointmentService.getAllAppointmentsWithPagination(pageable);
	
	} 
}

*/

package com.medi360.controller;

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
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    
    @PostMapping("/add")
    public ResponseEntity<AppointmentResponseDTO> addAppointment(@RequestBody AppointmentDTO appointmentDTO) 
        throws PatientNotFoundException,
               DoctorNotFoundException,
               SlotNotAvailableException 
{

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
}






