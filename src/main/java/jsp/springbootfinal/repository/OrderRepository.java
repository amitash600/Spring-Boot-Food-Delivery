package jsp.springbootfinal.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.springbootfinal.entity.Order;
import jsp.springbootfinal.enums.Status;

public interface OrderRepository extends JpaRepository<Order, Integer>{
	List<Order> findByCustomerCustomerId(Integer customerId);
	
	List<Order> findByStatus(Status status);
	
	 List<Order> findByOrderDateTimeBetween(LocalDateTime start, LocalDateTime end);
	 
	 List<Order> findByTotalAmountBetween(Double minAmount, Double maxAmount);
	 
	 List<Order> findDistinctByOrderItemsMenuItemRestaurantRestaurantId(Integer restaurantId);

}
