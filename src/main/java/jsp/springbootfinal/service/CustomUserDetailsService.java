package jsp.springbootfinal.service;

import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user from database: " + username);
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("Customer not found with username: " + username);
                    return new UsernameNotFoundException("Customer not found with username: " + username);
                });
        System.out.println("User loaded successfully: " + customer.getUsername() + 
                          ", Role: " + customer.getRole() + 
                          ", Password hash: " + customer.getPassword().substring(0, Math.min(10, customer.getPassword().length())) + "...");
        return customer;
    }
}
