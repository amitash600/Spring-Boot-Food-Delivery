package jsp.springbootfinal.service;

import jakarta.mail.MessagingException;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.entity.PasswordResetToken;
import jsp.springbootfinal.repository.CustomerRepository;
import jsp.springbootfinal.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final int TOKEN_EXPIRATION_MINUTES = 30;

    @Transactional
    public String createPasswordResetToken(String email) throws MessagingException {
        Optional<Customer> customerOpt = customerRepository.findByEmailId(email);
        
        if (customerOpt.isEmpty()) {
            // Don't reveal that email doesn't exist for security
            return "If an account with this email exists, a password reset link has been sent.";
        }

        Customer customer = customerOpt.get();

        // Delete any existing tokens for this customer
        tokenRepository.deleteByCustomerCustomerId(customer.getCustomerId());

        // Create new token
        String resetToken = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(TOKEN_EXPIRATION_MINUTES);

        PasswordResetToken passwordResetToken = new PasswordResetToken(resetToken, customer, expiryDate);
        tokenRepository.save(passwordResetToken);

        // Send email
        emailService.sendPasswordResetEmail(customer.getEmailId(), resetToken, customer.getCustomerName());

        return "Password reset link has been sent to your email address.";
    }

    @Transactional
    public String resetPassword(String token, String newPassword) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);

        if (tokenOpt.isEmpty()) {
            return "Invalid or expired reset token.";
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            return "Reset token has expired. Please request a new password reset.";
        }

        Customer customer = resetToken.getCustomer();
        customer.setPassword(passwordEncoder.encode(newPassword));
        customerRepository.save(customer);

        // Delete the used token
        tokenRepository.delete(resetToken);

        try {
            emailService.sendPasswordResetConfirmationEmail(customer.getEmailId(), customer.getCustomerName());
        } catch (MessagingException e) {
            // Log error but don't fail the password reset
            System.err.println("Failed to send password reset confirmation email: " + e.getMessage());
        }

        return "Password has been successfully reset.";
    }

    public boolean validateResetToken(String token) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        
        return tokenOpt.isPresent() && !tokenOpt.get().isExpired();
    }

    @Transactional
    public void cleanupExpiredTokens() {
        tokenRepository.deleteExpiredTokens(LocalDateTime.now());
    }
}
