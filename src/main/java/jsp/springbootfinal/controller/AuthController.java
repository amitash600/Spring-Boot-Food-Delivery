package jsp.springbootfinal.controller;

import jsp.springbootfinal.dto.JwtResponse;
import jsp.springbootfinal.dto.LoginRequest;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.repository.CustomerRepository;
import jsp.springbootfinal.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Customer customer = (Customer) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(customer.getUsername());

        return ResponseEntity.ok(new JwtResponse(jwt, customer.getUsername(), customer.getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Customer customer) {
        if (customerRepository.existsByUsername(customer.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (customerRepository.existsByEmailId(customer.getEmailId())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        if (customerRepository.existsByContactNumber(customer.getContactNumber())) {
            return ResponseEntity.badRequest().body("Error: Contact number is already in use!");
        }

        // Encode password and set role (default to CUSTOMER, but allow ADMIN role)
        customer.setPassword(encoder.encode(customer.getPassword()));
        if (customer.getRole() == null || customer.getRole().isEmpty()) {
            customer.setRole("CUSTOMER");
        }

        customerRepository.save(customer);

        return ResponseEntity.ok("Customer registered successfully with role: " + customer.getRole());
    }
}
