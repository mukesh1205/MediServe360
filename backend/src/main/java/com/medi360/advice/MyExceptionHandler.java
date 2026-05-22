package com.medi360.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.medi360.DTO.ErrorResponse;
import com.medi360.exception.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
@RestControllerAdvice
public class MyExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleAllExceptions(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(500);
		response.setErrorMessage("Internal server error");
		return ResponseEntity.status(500).body(response);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {

		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(400);

		String errorMessage = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();

		response.setErrorMessage(errorMessage);

		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgs(IllegalArgumentException e) {

		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(400);
		response.setErrorMessage(e.getMessage());

		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> handleHttpMessageNotReadable(HttpMessageNotReadableException e) {

		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(400);
		response.setErrorMessage("Invalid request format or data type");

		return ResponseEntity.badRequest().body(response);
	}

	@ExceptionHandler(PatientNotFoundException.class)
	public ResponseEntity<ErrorResponse> handlePatientNotFound(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(404);
		response.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(response);
	}

	@ExceptionHandler(InvoiceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleInvoiceNotFound(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(404);
		response.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(response);
	}

	@ExceptionHandler(InsuranceClaimNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleInsuranceClaimNotFound(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(404);
		response.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(response);
	}

	@ExceptionHandler(BedNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleBedNotFound(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(404);
		response.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(response);
	}

	@ExceptionHandler(WardNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleWardNotFound(Exception e) {
		ErrorResponse response = new ErrorResponse();
		response.setHttpStatusCode(404);
		response.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(response);
	}
	

	
	@ExceptionHandler({
        AppointmentNotFoundException.class,
        DoctorNotFoundException.class,
        SlotNotAvailableException.class
    })
	
    public ResponseEntity<ErrorResponse> handleAppointmentExceptions(Exception e) {

    ErrorResponse response = new ErrorResponse();
    response.setHttpStatusCode(404);
    response.setErrorMessage(e.getMessage());

    return ResponseEntity.status(404).body(response);
  }
		
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFound(Exception e){
		ErrorResponse err=new ErrorResponse();
		err.setHttpStatusCode(404);
		err.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(err);
	}
	
	@ExceptionHandler(AuditNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleAuditNotFound(Exception e){
		ErrorResponse err=new ErrorResponse();
		err.setHttpStatusCode(404);
		err.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(err);
	}
	
	@ExceptionHandler(NotificationNotfoundException.class)
	public ResponseEntity<ErrorResponse> handleNotificationNotFound(Exception e){
		ErrorResponse err=new ErrorResponse();
		err.setHttpStatusCode(404);
		err.setErrorMessage(e.getMessage());
		return ResponseEntity.status(404).body(err);
	}
}






