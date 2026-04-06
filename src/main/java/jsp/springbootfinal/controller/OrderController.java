package jsp.springbootfinal.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.OrderResponseDTO;
import jsp.springbootfinal.dto.OrderStatusUpdateRequestDTO;
import jsp.springbootfinal.dto.PaymentStatusUpdateRequestDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.enums.Status;
import jsp.springbootfinal.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@GetMapping
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchAllOrders() {
		return orderService.fetchAllOrders();
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<ResponseStructure<OrderResponseDTO>> fetchOrderById(@PathVariable Integer orderId) {
		return orderService.fetchOrderById(orderId);
	}

	@GetMapping("/customer/{customerId}")
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersOfCustomer(
			@PathVariable Integer customerId) {
		return orderService.fetchOrdersOfCustomer(customerId);
	}

	@GetMapping("/status/{status}")
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersByStatus(@PathVariable Status status) {
		return orderService.fetchOrdersByStatus(status);
	}

	@GetMapping("/by-date/{date}")
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> fetchOrdersByDate(
			@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return orderService.fetchOrdersByDate(date);
	}

	@GetMapping("/amount/{minAmount}/{maxAmount}")
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> getOrdersBetweenTotalAmountRange(
			@PathVariable Double minAmount, @PathVariable Double maxAmount) {
		return orderService.fetchOrdersBetweenTotalAmountRange(minAmount, maxAmount);
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> getOrdersByRestaurant(
			@PathVariable Integer restaurantId) {
		return orderService.fetchOrdersByRestaurant(restaurantId);
	}

	@PutMapping("/{orderId}/status")
	public ResponseEntity<ResponseStructure<OrderResponseDTO>> updateOrderStatus(@PathVariable Integer orderId,
			@RequestBody OrderStatusUpdateRequestDTO requestDTO) {
		return orderService.updateOrderStatus(orderId, requestDTO.getStatus());
	}

	@PutMapping("/{orderId}/payment")
	public ResponseEntity<ResponseStructure<OrderResponseDTO>> updatePaymentStatus(@PathVariable Integer orderId,
			@RequestBody PaymentStatusUpdateRequestDTO requestDTO) {
		return orderService.updatePaymentStatus(orderId, requestDTO.getPaymentStatus());
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<ResponseStructure<OrderResponseDTO>> cancelOrder(@PathVariable Integer orderId) {
		return orderService.cancelOrder(orderId);
	}
}
