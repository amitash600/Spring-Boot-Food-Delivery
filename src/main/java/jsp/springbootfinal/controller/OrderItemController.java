package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.AddItemRequest;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.dto.UpdateQuantityRequest;
import jsp.springbootfinal.entity.OrderItem;
import jsp.springbootfinal.service.OrderItemService;

@RestController
@RequestMapping("/api/admin/orderitems")
@PreAuthorize("hasRole('ADMIN')")
public class OrderItemController {

	@Autowired
	private OrderItemService orderItemService;

	@GetMapping("/order/{orderId}")
	public ResponseEntity<ResponseStructure<List<OrderItem>>> getItemsOfOrder(@PathVariable Integer orderId) {
		return orderItemService.getItemsOfOrder(orderId);
	}

	@PostMapping("/order/{orderId}/items")
	public ResponseEntity<ResponseStructure<OrderItem>> addItemToOrder(@PathVariable Integer orderId,
			@RequestBody AddItemRequest request) {
		return orderItemService.addItemToExistingOrder(orderId, request.getMenuItemId(), request.getQuantity());
	}

	@PutMapping("/{orderItemId}")
	public ResponseEntity<ResponseStructure<OrderItem>> updateItemQuantity(@PathVariable Integer orderItemId,
			@RequestBody UpdateQuantityRequest request) {
		return orderItemService.updateItemQuantity(orderItemId, request);
	}

	@DeleteMapping("/{orderItemId}")
	public ResponseEntity<ResponseStructure<String>> removeItem(@PathVariable Integer orderItemId) {
		return orderItemService.removeItemFromOrder(orderItemId);
	}
}
