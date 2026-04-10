package jsp.springbootfinal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tokenId;
    
    @Column(unique = true, nullable = false)
    private String token;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(nullable = false)
    private LocalDateTime expiryDate;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    public PasswordResetToken() {
        this.createdAt = LocalDateTime.now();
    }
    
    public PasswordResetToken(String token, Customer customer, LocalDateTime expiryDate) {
        this.token = token;
        this.customer = customer;
        this.expiryDate = expiryDate;
        this.createdAt = LocalDateTime.now();
    }
    
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }
    
    // Getters and Setters
    public Integer getTokenId() {
        return tokenId;
    }
    
    public void setTokenId(Integer tokenId) {
        this.tokenId = tokenId;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public Customer getCustomer() {
        return customer;
    }
    
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
