package jsp.springbootfinal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jsp.springbootfinal.dao.CustomerDao;
import jsp.springbootfinal.dto.CustomerResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.error.NoRecordFoundException;

@Service
public class CustomerService {

	@Autowired
	private CustomerDao customerDao;

	// Helper method to convert Customer to CustomerResponseDTO
	private CustomerResponseDTO convertToCustomerResponseDTO(Customer customer) {
		CustomerResponseDTO dto = new CustomerResponseDTO();
		dto.setCustomerId(customer.getCustomerId());
		dto.setCustomerName(customer.getCustomerName());
		dto.setEmailId(customer.getEmailId());
		dto.setContactNumber(customer.getContactNumber());
		dto.setAddress(customer.getAddress());
		dto.setUsername(customer.getUsername());
		dto.setRole(customer.getRole());
		return dto;
	}

	public ResponseEntity<ResponseStructure<Customer>> saveCustomer(Customer customer) {

		String email = customer.getEmailId();
		Long contact = customer.getContactNumber();

		if (customerDao.emailExists(email)) {
			throw new DataIntegrityViolationException("Email already exists");
		}

		if (customerDao.contactExists(contact)) {
			throw new DataIntegrityViolationException("Contact number already exists");
		}

		if (String.valueOf(contact).length() != 10) {
			throw new DataIntegrityViolationException("Contact number must be exactly 10 digits");
		}

		Customer c = customerDao.saveCustomer(customer);
		ResponseStructure<Customer> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.CREATED.value());
		res.setMessage("Saved");
		res.setData(c);
		return new ResponseEntity<ResponseStructure<Customer>>(res, HttpStatus.CREATED);

	}
	
	  public ResponseEntity<ResponseStructure<List<Customer>>> getAllCustomers() {

		  List<Customer> customers = customerDao.getAllCustomers();

	        ResponseStructure<List<Customer>> res = new ResponseStructure<>();

	        if (!customers.isEmpty()) {

	            res.setStatusCode(HttpStatus.OK.value());
	            res.setMessage("Customers fetched successfully");
	            res.setData(customers);

	            return new ResponseEntity<ResponseStructure<List<Customer>>>(res, HttpStatus.OK);

	        } else {

	            throw new NoRecordFoundException("Customer table is empty");

	        }
	    }
	  
	  public ResponseEntity<ResponseStructure<CustomerResponseDTO>> fetchCustomerById(Integer id) {

		    Optional<Customer> optional = customerDao.fetchCustomerById(id);

		    ResponseStructure<CustomerResponseDTO> res = new ResponseStructure<>();

		    if (optional.isPresent()) {

		        Customer customer = optional.get();
		        CustomerResponseDTO customerDTO = convertToCustomerResponseDTO(customer);

		        res.setStatusCode(HttpStatus.OK.value());
		        res.setMessage("Customer fetched successfully");
		        res.setData(customerDTO);

		        return new ResponseEntity<ResponseStructure<CustomerResponseDTO>>(res, HttpStatus.OK);

		    } else {

		        throw new NoRecordFoundException("Customer ID not found");

		    }

		}
	  
	  public ResponseEntity<ResponseStructure<CustomerResponseDTO>> fetchCustomerByContact(Long contact){

		    Optional<Customer> optional = customerDao.fetchCustomerByContact(contact);

		    ResponseStructure<CustomerResponseDTO> res = new ResponseStructure<>();

		    if(optional.isPresent()){

		        Customer customer = optional.get();
		        CustomerResponseDTO customerDTO = convertToCustomerResponseDTO(customer);

		        res.setStatusCode(HttpStatus.OK.value());
		        res.setMessage("Customer fetched successfully");
		        res.setData(customerDTO);

		        return new ResponseEntity<ResponseStructure<CustomerResponseDTO>>(res,HttpStatus.OK);

		    }else{

		        throw new NoRecordFoundException("Customer with this contact number not found");

		    }
		}
	  
	  
	  
	  public ResponseEntity<ResponseStructure<CustomerResponseDTO>> updateCustomer(Integer id, Customer customer) {

		    // Security Check: Ensure the customer ID in JSON matches the URL path ID
		    if (customer.getCustomerId() != null && !customer.getCustomerId().equals(id)) {
		        throw new SecurityException("Customer ID in JSON does not match URL path ID");
		    }

		    Optional<Customer> optional = customerDao.fetchCustomerById(id);

		    if(optional.isPresent()) {

		        Customer existing = optional.get();

		        String email = customer.getEmailId();
		        Long contact = customer.getContactNumber();

		        // Check for duplicate email (excluding current customer)
		        if(email != null && customerDao.emailExists(email) && !existing.getEmailId().equals(email)) {
		            throw new DataIntegrityViolationException("Email already exists for another customer");
		        }

		        // Check for duplicate contact number (excluding current customer)
		        if(contact != null && customerDao.contactExists(contact) && !existing.getContactNumber().equals(contact)) {
		            throw new DataIntegrityViolationException("Contact number already exists for another customer");
		        }

		        // Validate contact number format
		        if(contact != null && String.valueOf(contact).length() != 10) {
		            throw new DataIntegrityViolationException("Contact number must be exactly 10 digits");
		        }

		        // Update only non-null fields
		        if(customer.getCustomerName() != null) {
		            existing.setCustomerName(customer.getCustomerName());
		        }
		        if(email != null) {
		            existing.setEmailId(email);
		        }
		        if(contact != null) {
		            existing.setContactNumber(contact);
		        }
		        if(customer.getAddress() != null) {
		            existing.setAddress(customer.getAddress());
		        }
		        if(customer.getUsername() != null) {
		            existing.setUsername(customer.getUsername());
		        }
		        if(customer.getPassword() != null) {
		            existing.setPassword(customer.getPassword());
		        }
		        if(customer.getRole() != null) {
		            existing.setRole(customer.getRole());
		        }

		        Customer updated = customerDao.saveCustomer(existing);
		        CustomerResponseDTO customerDTO = convertToCustomerResponseDTO(updated);

		        ResponseStructure<CustomerResponseDTO> res = new ResponseStructure<>();

		        res.setStatusCode(HttpStatus.OK.value());
		        res.setMessage("Customer updated successfully");
		        res.setData(customerDTO);

		        return new ResponseEntity<ResponseStructure<CustomerResponseDTO>>(res, HttpStatus.OK);

		    } else {
		        throw new NoRecordFoundException("Customer ID not found");
		    }
		}
	  
	  public ResponseEntity<ResponseStructure<String>> deleteCustomer(Integer id) {

		    Optional<Customer> optional = customerDao.fetchCustomerById(id);

		    if (optional.isPresent()) {

		        Customer customer = optional.get();

		        // Check if customer has orders
		        if (customer.getOrders() != null && !customer.getOrders().isEmpty()) {
		            throw new IllegalStateException("Customer has orders, deletion not allowed");
		        }

		        customerDao.deleteCustomer(id);

		        ResponseStructure<String> res = new ResponseStructure<>();

		        res.setStatusCode(HttpStatus.OK.value());
		        res.setMessage("Customer deleted successfully");
		        res.setData("Deleted!");

		        return new ResponseEntity<ResponseStructure<String>>(res, HttpStatus.OK);

		    } else {

		        throw new NoRecordFoundException("Customer ID not found");

		    }
		}
}
