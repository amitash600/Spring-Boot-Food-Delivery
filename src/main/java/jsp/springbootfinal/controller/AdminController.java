package jsp.springbootfinal.controller;

import java.util.List;

import jsp.springbootfinal.dto.CustomerResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseStructure<List<Customer>>> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/customers/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> getCustomerById(@PathVariable Integer id) {
        return customerService.fetchCustomerById(id);
    }

    @GetMapping("/customers/contact/{contact}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> getCustomerByContact(@PathVariable Long contact) {
        return customerService.fetchCustomerByContact(contact);
    }

    @PutMapping("/customers/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/customers/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseStructure<String>> deleteCustomer(@PathVariable Integer id) {
        return customerService.deleteCustomer(id);
    }
}
