package jsp.springbootfinal.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jsp.springbootfinal.dao.CustomerDao;
import jsp.springbootfinal.dao.MenuItemDao;
import jsp.springbootfinal.dao.OrderDao;
import jsp.springbootfinal.dto.CustomerResponseDTO;
import jsp.springbootfinal.dto.OrderItemResponseDTO;
import jsp.springbootfinal.dto.OrderResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.entity.MenuItem;
import jsp.springbootfinal.entity.Order;
import jsp.springbootfinal.entity.OrderItem;
import jsp.springbootfinal.enums.PaymentStatus;
import jsp.springbootfinal.enums.Status;
import jsp.springbootfinal.error.NoRecordFoundException;

@Service
public class OrderService {

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private MenuItemDao menuItemDao;

	public ResponseEntity<ResponseStructure<OrderResponseDTO>> placeOrder(Order order) {
		if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
			throw new IllegalStateException("Order must contain at least one item");
		}
		if (order.getCustomer() == null) {
			throw new IllegalStateException("Customer must be provided");
		}
		Integer customerId = order.getCustomer().getCustomerId();
		Optional<Customer> customerOptional = customerDao.fetchCustomerById(customerId);
		if (customerOptional.isEmpty()) {
			throw new NoRecordFoundException("Customer not found");
		}
		Customer customer = customerOptional.get();
		if (order.getPayment() == null) {
			throw new IllegalStateException("Payment must be provided before placing order");
		}
		double totalAmount = 0;
		for (OrderItem item : order.getOrderItems()) {
			if (item.getQuantity() == null || item.getQuantity() < 1) {
				throw new IllegalStateException("Order quantity must be minimum 1");
			}
			if (item.getMenuItem() == null || item.getMenuItem().getItemId() == null) {
				throw new IllegalStateException("MenuItem must be provided for each order item");
			}
			Integer menuItemId = item.getMenuItem().getItemId();
			Optional<MenuItem> menuItemOptional = menuItemDao.fetchMenuItemById(menuItemId);
			if (menuItemOptional.isEmpty()) {
				throw new NoRecordFoundException("Menu item not found");
			}
			MenuItem menuItem = menuItemOptional.get();
			if (!menuItem.getAvailability()) {
				throw new IllegalStateException(menuItem.getItemName() + " is currently unavailable");
			}
			double subTotal = menuItem.getPrice() * item.getQuantity();
			item.setSubTotal(subTotal);
			totalAmount += subTotal;
			item.setMenuItem(menuItem);
			item.setOrder(order);
		}
		order.setTotalAmount(totalAmount);
		order.getPayment().setAmount(totalAmount);
		order.setCustomer(customer);
		if (order.getPayment().getPaymentStatus() == PaymentStatus.FAILED) {
			order.setStatus(Status.PENDING_PAYMENT);
		} else {
			order.setStatus(Status.PLACED);
		}
		order.getPayment().setOrder(order);
		Order savedOrder = orderDao.saveOrder(order);
		/* -------- DTO CONVERSION START -------- */ CustomerResponseDTO customerDTO = new CustomerResponseDTO();
		customerDTO.setCustomerId(savedOrder.getCustomer().getCustomerId());
		customerDTO.setCustomerName(savedOrder.getCustomer().getCustomerName());
		OrderResponseDTO orderDTO = new OrderResponseDTO();
		orderDTO.setOrderId(savedOrder.getOrderId());
		orderDTO.setOrderDateTime(savedOrder.getOrderDateTime());
		orderDTO.setStatus(savedOrder.getStatus());
		orderDTO.setTotalAmount(savedOrder.getTotalAmount());
		orderDTO.setCustomer(customerDTO);
		orderDTO.setPayment(savedOrder.getPayment());

		List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

		for (OrderItem item : savedOrder.getOrderItems()) {

			OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

			itemDTO.setOrderItemId(item.getOrderItemId());
			itemDTO.setItemName(item.getMenuItem().getItemName());
			itemDTO.setPrice(item.getMenuItem().getPrice());
			itemDTO.setQuantity(item.getQuantity());
			itemDTO.setSubTotal(item.getSubTotal());

			itemDTOList.add(itemDTO);
		}

		orderDTO.setOrderItems(itemDTOList);

		/* -------- DTO CONVERSION END -------- */
		ResponseStructure<OrderResponseDTO> res = new ResponseStructure<>();
		res.setStatusCode(HttpStatus.CREATED.value());
		res.setMessage("Order placed successfully");
		res.setData(orderDTO);
		return new ResponseEntity<ResponseStructure<OrderResponseDTO>>(res, HttpStatus.CREATED);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchAllOrders() {

		List<Order> orders = orderDao.fetchAllOrders();

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found");
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			// Customer DTO
			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			// OrderItem DTO list
			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			// Order DTO
			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("All orders fetched successfully");
		res.setData(orderDTOList);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<OrderResponseDTO>> fetchOrderById(Integer orderId) {

		Optional<Order> optionalOrder = orderDao.fetchOrderById(orderId);

		if (optionalOrder.isEmpty()) {
			throw new NoRecordFoundException("Order not found");
		}

		Order order = optionalOrder.get();

		// Customer DTO
		CustomerResponseDTO customerDTO = new CustomerResponseDTO();
		customerDTO.setCustomerId(order.getCustomer().getCustomerId());
		customerDTO.setCustomerName(order.getCustomer().getCustomerName());

		// OrderItem DTO list
		List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

		for (OrderItem item : order.getOrderItems()) {

			OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

			itemDTO.setOrderItemId(item.getOrderItemId());
			itemDTO.setItemName(item.getMenuItem().getItemName());
			itemDTO.setPrice(item.getMenuItem().getPrice());
			itemDTO.setQuantity(item.getQuantity());
			itemDTO.setSubTotal(item.getSubTotal());

			itemDTOList.add(itemDTO);
		}

		// Order DTO
		OrderResponseDTO orderDTO = new OrderResponseDTO();

		orderDTO.setOrderId(order.getOrderId());
		orderDTO.setOrderDateTime(order.getOrderDateTime());
		orderDTO.setStatus(order.getStatus());
		orderDTO.setTotalAmount(order.getTotalAmount());
		orderDTO.setCustomer(customerDTO);
		orderDTO.setPayment(order.getPayment());
		orderDTO.setOrderItems(itemDTOList);

		ResponseStructure<OrderResponseDTO> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Order fetched successfully");
		res.setData(orderDTO);

		return new ResponseEntity<ResponseStructure<OrderResponseDTO>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersOfCustomer(Integer customerId) {

		List<Order> orders = orderDao.fetchOrdersOfCustomer(customerId);

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found for this customer");
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Customer orders fetched successfully");
		res.setData(orderDTOList);

		return new ResponseEntity<ResponseStructure<List<OrderResponseDTO>>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersByStatus(Status status) {

		List<Order> orders = orderDao.fetchOrdersByStatus(status);

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found with status " + status);
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Orders fetched successfully by status");
		res.setData(orderDTOList);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersByDate(LocalDate date) {

		LocalDateTime start = date.atStartOfDay();
		LocalDateTime end = date.atTime(23, 59, 59);

		List<Order> orders = orderDao.fetchOrdersByDate(start, end);

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found on date " + date);
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Orders fetched successfully by date");
		res.setData(orderDTOList);

		return new ResponseEntity<ResponseStructure<List<OrderResponseDTO>>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersBetweenTotalAmountRange(
			Double minAmount, Double maxAmount) {

		List<Order> orders = orderDao.fetchOrdersBetweenTotalAmountRange(minAmount, maxAmount);

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found between amount " + minAmount + " and " + maxAmount);
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Orders fetched successfully between total amount range");
		res.setData(orderDTOList);

		return new ResponseEntity<ResponseStructure<List<OrderResponseDTO>>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersByRestaurant(Integer restaurantId) {

		List<Order> orders = orderDao.fetchOrdersByRestaurant(restaurantId);

		if (orders.isEmpty()) {
			throw new NoRecordFoundException("No orders found for restaurant id " + restaurantId);
		}

		List<OrderResponseDTO> orderDTOList = new ArrayList<>();

		for (Order order : orders) {

			CustomerResponseDTO customerDTO = new CustomerResponseDTO();
			customerDTO.setCustomerId(order.getCustomer().getCustomerId());
			customerDTO.setCustomerName(order.getCustomer().getCustomerName());

			List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

			for (OrderItem item : order.getOrderItems()) {

				OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

				itemDTO.setOrderItemId(item.getOrderItemId());
				itemDTO.setItemName(item.getMenuItem().getItemName());
				itemDTO.setPrice(item.getMenuItem().getPrice());
				itemDTO.setQuantity(item.getQuantity());
				itemDTO.setSubTotal(item.getSubTotal());

				itemDTOList.add(itemDTO);
			}

			OrderResponseDTO orderDTO = new OrderResponseDTO();

			orderDTO.setOrderId(order.getOrderId());
			orderDTO.setOrderDateTime(order.getOrderDateTime());
			orderDTO.setStatus(order.getStatus());
			orderDTO.setTotalAmount(order.getTotalAmount());

			orderDTO.setCustomer(customerDTO);
			orderDTO.setPayment(order.getPayment());
			orderDTO.setOrderItems(itemDTOList);

			orderDTOList.add(orderDTO);
		}

		ResponseStructure<List<OrderResponseDTO>> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Orders fetched successfully for restaurant");
		res.setData(orderDTOList);

		return new ResponseEntity<ResponseStructure<List<OrderResponseDTO>>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<OrderResponseDTO>> updateOrderStatus(Integer orderId, Status newStatus) {

		Optional<Order> optional = orderDao.fetchOrderById(orderId);

		if (optional.isEmpty()) {
			throw new NoRecordFoundException("Order not found with id " + orderId);
		}

		Order order = optional.get();
		Status currentStatus = order.getStatus();

		// Handle cancellation separately
		if (newStatus == Status.CANCELLED) {

			if (currentStatus == Status.PREPARING || currentStatus == Status.DELIVERED) {
				throw new IllegalStateException("Order cannot be cancelled after preparation started");
			}

		}

		else {

			// prevent backward status change
			if (newStatus.ordinal() < currentStatus.ordinal()) {
				throw new IllegalStateException("Invalid status transition from " + currentStatus + " to " + newStatus);
			}

			// prevent skipping status
			if (newStatus.ordinal() > currentStatus.ordinal() + 1) {
				throw new IllegalStateException("Order status must follow sequential flow");
			}
		}

		// single update + save
		order.setStatus(newStatus);
		Order updatedOrder = orderDao.saveOrder(order);

		// DTO mapping
		CustomerResponseDTO customerDTO = new CustomerResponseDTO();
		customerDTO.setCustomerId(updatedOrder.getCustomer().getCustomerId());
		customerDTO.setCustomerName(updatedOrder.getCustomer().getCustomerName());

		List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

		for (OrderItem item : updatedOrder.getOrderItems()) {

			OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

			itemDTO.setOrderItemId(item.getOrderItemId());
			itemDTO.setItemName(item.getMenuItem().getItemName());
			itemDTO.setPrice(item.getMenuItem().getPrice());
			itemDTO.setQuantity(item.getQuantity());
			itemDTO.setSubTotal(item.getSubTotal());

			itemDTOList.add(itemDTO);
		}

		OrderResponseDTO orderDTO = new OrderResponseDTO();

		orderDTO.setOrderId(updatedOrder.getOrderId());
		orderDTO.setOrderDateTime(updatedOrder.getOrderDateTime());
		orderDTO.setStatus(updatedOrder.getStatus());
		orderDTO.setTotalAmount(updatedOrder.getTotalAmount());

		orderDTO.setCustomer(customerDTO);
		orderDTO.setPayment(updatedOrder.getPayment());
		orderDTO.setOrderItems(itemDTOList);

		ResponseStructure<OrderResponseDTO> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Order status updated successfully");
		res.setData(orderDTO);

		return new ResponseEntity<ResponseStructure<OrderResponseDTO>>(res, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<OrderResponseDTO>> cancelOrder(Integer orderId) {
		return updateOrderStatus(orderId, Status.CANCELLED);
	}

	public ResponseEntity<ResponseStructure<OrderResponseDTO>> updatePaymentStatus(Integer orderId, PaymentStatus newPaymentStatus) {
		Optional<Order> optional = orderDao.fetchOrderById(orderId);

		if (optional.isEmpty()) {
			throw new NoRecordFoundException("Order not found with id " + orderId);
		}

		Order order = optional.get();

		Status currentStatus = order.getStatus();

		if (currentStatus == Status.PREPARING || currentStatus == Status.DELIVERED) {
			throw new IllegalStateException("Order cannot be cancelled after preparation started");
		}

		order.setStatus(Status.CANCELLED);

		Order updatedOrder = orderDao.saveOrder(order);

		CustomerResponseDTO customerDTO = new CustomerResponseDTO();
		customerDTO.setCustomerId(updatedOrder.getCustomer().getCustomerId());
		customerDTO.setCustomerName(updatedOrder.getCustomer().getCustomerName());

		List<OrderItemResponseDTO> itemDTOList = new ArrayList<>();

		for (OrderItem item : updatedOrder.getOrderItems()) {

			OrderItemResponseDTO itemDTO = new OrderItemResponseDTO();

			itemDTO.setOrderItemId(item.getOrderItemId());
			itemDTO.setItemName(item.getMenuItem().getItemName());
			itemDTO.setPrice(item.getMenuItem().getPrice());
			itemDTO.setQuantity(item.getQuantity());
			itemDTO.setSubTotal(item.getSubTotal());

			itemDTOList.add(itemDTO);
		}

		OrderResponseDTO orderDTO = new OrderResponseDTO();

		orderDTO.setOrderId(updatedOrder.getOrderId());
		orderDTO.setOrderDateTime(updatedOrder.getOrderDateTime());
		orderDTO.setStatus(updatedOrder.getStatus());
		orderDTO.setTotalAmount(updatedOrder.getTotalAmount());

		orderDTO.setCustomer(customerDTO);
		orderDTO.setPayment(updatedOrder.getPayment());
		orderDTO.setOrderItems(itemDTOList);

		ResponseStructure<OrderResponseDTO> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.OK.value());
		res.setMessage("Order cancelled successfully");
		res.setData(orderDTO);

		return new ResponseEntity<ResponseStructure<OrderResponseDTO>>(res, HttpStatus.OK);
	}
}