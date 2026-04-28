package com.medi360.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.medi360.DTO.InvoiceDTO;
import com.medi360.DTO.InvoiceResponseDTO;
import com.medi360.entities.Invoice;
import com.medi360.exception.InvoiceNotFoundException;
import com.medi360.exception.PatientNotFoundException;
import com.medi360.service.InvoiceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class InvoiceController {
	@Autowired
	InvoiceService invoiceService;
	
	@PostMapping("/addInvoice")
	public ResponseEntity<InvoiceResponseDTO> f1(@Valid @RequestBody InvoiceDTO invoiceDTO) throws PatientNotFoundException {
		Invoice i=this.invoiceService.addInvoice(invoiceDTO.getInvoice());
		InvoiceResponseDTO dto=new InvoiceResponseDTO();
		dto.setInvoice(i);
		dto.setStatusCode(201);
		dto.setMessage("Invoice created successfully");
		
		return ResponseEntity.status(201).body(dto);
	}
	
	@PutMapping("/updateInvoice")
	public ResponseEntity<InvoiceResponseDTO> f2(@Valid @RequestBody InvoiceDTO invoiceDTO) throws InvoiceNotFoundException, PatientNotFoundException{
		Invoice i=this.invoiceService.updateInvoice(invoiceDTO.getInvoice());
		InvoiceResponseDTO dto=new InvoiceResponseDTO();
		dto.setInvoice(i);
		dto.setStatusCode(200);
		dto.setMessage("Invoice updated successfully");
		
		return ResponseEntity.status(200).body(dto);
	}
	@DeleteMapping("/deleteInvoice/{id}")
	public String f3(@PathVariable int id) throws InvoiceNotFoundException {
		return this.invoiceService.deleteInvoice(id);
	}
	
	@GetMapping("/fetchAllInvoices")
	public List<Invoice> f4(){
		return this.invoiceService.getAllInvoices();
	}
	@GetMapping("/fetchAllInvoicesPaginated")
	public Page<Invoice> f6(@RequestParam(name="pgno") int pgno,
							@RequestParam(name="size") int size,
							@RequestParam(name="sorting") String sorting,
							@RequestParam(name="asc") boolean asc){
		Sort sort=asc?Sort.by(sorting).ascending() : Sort.by(sorting).descending();
		
		Pageable pageable=PageRequest.of(pgno, size,sort);
		return this.invoiceService.getAllInvoicesWithPagination(pageable);
	}
}
