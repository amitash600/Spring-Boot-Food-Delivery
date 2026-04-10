package jsp.springbootfinal.repository;

import jsp.springbootfinal.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    
    Optional<PasswordResetToken> findByToken(String token);
    
    Optional<PasswordResetToken> findByCustomerCustomerId(Integer customerId);
    
    @Modifying
    @Query("DELETE FROM PasswordResetToken t WHERE t.customer.customerId = :customerId")
    void deleteByCustomerCustomerId(@Param("customerId") Integer customerId);
    
    @Modifying
    @Query("DELETE FROM PasswordResetToken t WHERE t.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") java.time.LocalDateTime now);
    
    boolean existsByToken(String token);
}
