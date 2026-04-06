package jsp.springbootfinal.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jsp.springbootfinal.entity.OrderItem;
import jsp.springbootfinal.repository.OrderItemRepository;

@Repository
public class OrderItemDao {

	@Autowired
	private OrderItemRepository orderItemRepository;

	public OrderItem saveOrderItem(OrderItem orderItem) {
		return orderItemRepository.save(orderItem);
	}

	public Optional<OrderItem> findById(Integer id) {
		return orderItemRepository.findById(id);
	}

	public void deleteOrderItem(OrderItem item) {
		orderItemRepository.delete(item);
	}

	public List<OrderItem> findItemsByOrderId(Integer orderId) {
		return orderItemRepository.findByOrderOrderId(orderId);
	}

}
