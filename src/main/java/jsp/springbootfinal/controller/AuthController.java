package jsp.springbootfinal.controller;

import jakarta.validation.Valid;
import jsp.springbootfinal.dto.ChangePasswordRequest;
import jsp.springbootfinal.dto.ForgotPasswordRequest;
import jsp.springbootfinal.dto.JwtResponse;
import jsp.springbootfinal.dto.LoginRequest;
import jsp.springbootfinal.dto.ResetPasswordRequest;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.repository.CustomerRepository;
import jsp.springbootfinal.security.JwtUtil;
import jsp.springbootfinal.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
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

    @Autowired
    PasswordResetService passwordResetService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for user: " + loginRequest.getUsername());
            
            // Check if user exists in database
            Customer customer = customerRepository.findByUsername(loginRequest.getUsername()).orElse(null);
            if (customer == null) {
                System.out.println("User not found: " + loginRequest.getUsername());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not found: " + loginRequest.getUsername());
            }
            
            System.out.println("User found: " + customer.getUsername() + ", Role: " + customer.getRole());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            Customer authenticatedCustomer = (Customer) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(authenticatedCustomer.getUsername());

            System.out.println("Authentication successful for: " + authenticatedCustomer.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwt, authenticatedCustomer.getUsername(), authenticatedCustomer.getRole()));
            
        } catch (Exception e) {
            System.out.println("Authentication failed for user: " + loginRequest.getUsername());
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Authentication failed: " + e.getMessage());
        }
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

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            String response = passwordResetService.createPasswordResetToken(request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process password reset request. Please try again.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid request: " + bindingResult.getAllErrors().get(0).getDefaultMessage());
        }

        if (!request.isPasswordMatching()) {
            return ResponseEntity.badRequest().body("Password and confirmation password do not match");
        }

        String response = passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
        
        if (response.contains("successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/verify-reset-token")
    public ResponseEntity<?> verifyResetToken(@RequestParam String token) {
        boolean isValid = passwordResetService.validateResetToken(token);
        
        if (isValid) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired reset token");
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Authentication authentication) {
        try {
            Customer customer = (Customer) authentication.getPrincipal();
            
            // Validate current password
            if (!encoder.matches(request.getCurrentPassword(), customer.getPassword())) {
                return ResponseEntity.badRequest().body("Current password is incorrect");
            }
            
            // Validate new password
            if (request.getNewPassword().length() < 6) {
                return ResponseEntity.badRequest().body("New password must be at least 6 characters long");
            }
            
            // Update password
            customer.setPassword(encoder.encode(request.getNewPassword()));
            customerRepository.save(customer);
            
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to change password. Please try again.");
        }
    }
}
