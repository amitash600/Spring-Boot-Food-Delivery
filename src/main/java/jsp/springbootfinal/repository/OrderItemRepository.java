package jsp.springbootfinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import jsp.springbootfinal.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	List<OrderItem> findByOrderOrderIdAndMenuItemItemId(Integer orderId, Integer itemId);
	
	 List<OrderItem> findByOrderOrderId(Integer orderId);

}