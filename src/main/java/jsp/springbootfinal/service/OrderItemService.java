package jsp.springbootfinal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jsp.springbootfinal.dao.OrderItemDao;
import jsp.springbootfinal.entity.MenuItem;
import jsp.springbootfinal.entity.Order;
import jsp.springbootfinal.entity.OrderItem;
import jsp.springbootfinal.enums.Status;
import jsp.springbootfinal.repository.MenuItemRepository;
import jsp.springbootfinal.repository.OrderRepository;
import jsp.springbootfinal.repository.OrderItemRepository;

import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.dto.UpdateQuantityRequest;

@Service
public class OrderItemService {

	@Autowired
	private OrderItemDao orderItemDao;

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private MenuItemRepository menuItemRepository;

	public ResponseEntity<ResponseStructure<OrderItem>> addItemToExistingOrder(Integer orderId, Integer menuItemId,
			Integer quantity) {

		ResponseStructure<OrderItem> structure = new ResponseStructure<>();

		Optional<Order> optionalOrder = orderRepository.findById(orderId);
		Optional<MenuItem> optionalMenu = menuItemRepository.findById(menuItemId);

		if (optionalOrder.isEmpty() || optionalMenu.isEmpty()) {

			structure.setStatusCode(HttpStatus.NOT_FOUND.value());
			structure.setMessage("Order or MenuItem not found");
			structure.setData(null);

			return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
		}

		Order order = optionalOrder.get();
		MenuItem menuItem = optionalMenu.get();

		List<OrderItem> existingItems = orderItemRepository.findByOrderOrderIdAndMenuItemItemId(orderId, menuItemId);

		OrderItem orderItem;

		if (!existingItems.isEmpty()) {

			orderItem = existingItems.get(0);

			int newQuantity = orderItem.getQuantity() + quantity;
			orderItem.setQuantity(newQuantity);

			double subtotal = newQuantity * menuItem.getPrice();
			orderItem.setSubTotal(subtotal);

		} else {

			orderItem = new OrderItem();
			orderItem.setOrder(order);
			orderItem.setMenuItem(menuItem);
			orderItem.setQuantity(quantity);

			double subtotal = quantity * menuItem.getPrice();
			orderItem.setSubTotal(subtotal);
		}

		OrderItem savedItem = orderItemRepository.save(orderItem);

		structure.setStatusCode(HttpStatus.OK.value());
		structure.setMessage("Item added/updated successfully");
		structure.setData(savedItem);

		return new ResponseEntity<ResponseStructure<OrderItem>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<OrderItem>> updateItemQuantity(Integer orderItemId,
			UpdateQuantityRequest request) {

		ResponseStructure<OrderItem> structure = new ResponseStructure<>();

		Optional<OrderItem> optional = orderItemDao.findById(orderItemId);

		if (optional.isPresent()) {

			OrderItem item = optional.get();

			Integer quantity = request.getQuantity();
			item.setQuantity(quantity);

			double price = item.getMenuItem().getPrice();
			item.setSubTotal(price * quantity);

			OrderItem updatedItem = orderItemDao.saveOrderItem(item);

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Order item quantity updated successfully");
			structure.setData(updatedItem);

			return new ResponseEntity<>(structure, HttpStatus.OK);
		}

		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		structure.setMessage("Order item not found");
		structure.setData(null);

		return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructure<String>> removeItemFromOrder(Integer orderItemId) {

		ResponseStructure<String> structure = new ResponseStructure<>();

		Optional<OrderItem> optional = orderItemDao.findById(orderItemId);

		if (optional.isPresent()) {

			OrderItem item = optional.get();
			Order order = item.getOrder();

			if (order.getStatus() == Status.PREPARING || order.getStatus() == Status.DELIVERED) {

				structure.setStatusCode(HttpStatus.BAD_REQUEST.value());
				structure.setMessage("Cannot modify order after preparation started");
				structure.setData(null);

				return new ResponseEntity<>(structure, HttpStatus.BAD_REQUEST);
			}

			// subtract item subtotal from order total
			double updatedTotal = Math.max(0, order.getTotalAmount() - item.getSubTotal());
			order.setTotalAmount(updatedTotal);

			// remove item from order list
			order.getOrderItems().remove(item);

			orderItemDao.deleteOrderItem(item);

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Item removed from order successfully");
			structure.setData("Deleted");

			return new ResponseEntity<ResponseStructure<String>>(structure, HttpStatus.OK);
		}

		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		structure.setMessage("Order item not found");
		structure.setData(null);

		return new ResponseEntity<ResponseStructure<String>>(structure, HttpStatus.NOT_FOUND);
	}

	public ResponseEntity<ResponseStructure<List<OrderItem>>> getItemsOfOrder(Integer orderId) {

		ResponseStructure<List<OrderItem>> structure = new ResponseStructure<>();

		Optional<Order> optional = orderRepository.findById(orderId);

		if (optional.isPresent()) {

			List<OrderItem> items = orderItemDao.findItemsByOrderId(orderId);

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Order items fetched successfully");
			structure.setData(items);

			return new ResponseEntity<ResponseStructure<List<OrderItem>>>(structure, HttpStatus.OK);
		}

		structure.setStatusCode(HttpStatus.NOT_FOUND.value());
		structure.setMessage("Order not found");
		structure.setData(null);

		return new ResponseEntity<ResponseStructure<List<OrderItem>>>(structure, HttpStatus.NOT_FOUND);
	}
}