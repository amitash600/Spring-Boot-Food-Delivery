package jsp.springbootfinal.controller;

import jsp.springbootfinal.dto.CustomerResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CustomerProfileController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> getMyProfile(Authentication authentication) {
        Customer customer = (Customer) authentication.getPrincipal();
        return customerService.fetchCustomerById(customer.getCustomerId());
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> updateMyProfile(Authentication authentication, @RequestBody Customer customer) {
        Customer loggedInCustomer = (Customer) authentication.getPrincipal();
        return customerService.updateCustomer(loggedInCustomer.getCustomerId(), customer);
    }

    @GetMapping("/profile/contact/{contact}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<CustomerResponseDTO>> getCustomerByContact(@PathVariable Long contact, Authentication authentication) {
        Customer loggedInCustomer = (Customer) authentication.getPrincipal();
        // Only allow customer to search by their own contact number
        if (!contact.equals(loggedInCustomer.getContactNumber())) {
            throw new RuntimeException("You can only view your own profile");
        }
        return customerService.fetchCustomerByContact(contact);
    }
}
