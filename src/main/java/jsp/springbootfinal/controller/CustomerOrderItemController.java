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
@RequestMapping("/api/orders")
public class CustomerOrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping("/{orderId}/items")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<OrderItem>>> getMyOrderItems(@PathVariable Integer orderId) {
        return orderItemService.getItemsOfOrder(orderId);
    }

    @PostMapping("/{orderId}/items")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<OrderItem>> addItemToMyOrder(@PathVariable Integer orderId,
            @RequestBody AddItemRequest request) {
        return orderItemService.addItemToExistingOrder(orderId, request.getMenuItemId(), request.getQuantity());
    }

    @PutMapping("/items/{orderItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<OrderItem>> updateMyItemQuantity(@PathVariable Integer orderItemId,
            @RequestBody UpdateQuantityRequest request) {
        return orderItemService.updateItemQuantity(orderItemId, request);
    }

    @DeleteMapping("/items/{orderItemId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<String>> removeMyItem(@PathVariable Integer orderItemId) {
        return orderItemService.removeItemFromOrder(orderItemId);
    }
}
