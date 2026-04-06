package jsp.springbootfinal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.springbootfinal.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	 boolean existsByEmailId(String emailId);

    boolean existsByContactNumber(Long contactNumber);
    
    Optional<Customer> findByContactNumber(Long contactNumber);
    
    Optional<Customer> findByUsername(String username);
    
    boolean existsByUsername(String username);
}
