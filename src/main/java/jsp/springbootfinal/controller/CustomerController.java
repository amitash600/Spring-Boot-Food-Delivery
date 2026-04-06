package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.CustomerResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
@PreAuthorize("hasRole('ADMIN')")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<Customer>> saveCustomer(@RequestBody Customer customer) {
		return customerService.saveCustomer(customer);
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<List<Customer>>> fetchAllCustomers() {
		return customerService.getAllCustomers();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<CustomerResponseDTO>> fetchCustomerById(@PathVariable Integer id) {
		return customerService.fetchCustomerById(id);
	}

	@GetMapping("/contact/{contact}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<CustomerResponseDTO>> fetchCustomerByContact(@PathVariable Long contact) {
		return customerService.fetchCustomerByContact(contact);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<CustomerResponseDTO>> updateCustomer(@PathVariable Integer id,
			@RequestBody Customer customer) {
		return customerService.updateCustomer(id, customer);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ResponseStructure<String>> deleteCustomer(@PathVariable Integer id) {
		return customerService.deleteCustomer(id);
	}
}
