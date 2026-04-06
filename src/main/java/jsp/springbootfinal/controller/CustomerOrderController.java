package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.OrderResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Customer;
import jsp.springbootfinal.entity.Order;
import jsp.springbootfinal.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<OrderResponseDTO>> placeOrder(@RequestBody Order order, Authentication authentication) {
        Customer loggedInCustomer = (Customer) authentication.getPrincipal();
        order.setCustomer(loggedInCustomer);
        return orderService.placeOrder(order);
    }

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<OrderResponseDTO>>> getMyOrders(Authentication authentication) {
        Customer loggedInCustomer = (Customer) authentication.getPrincipal();
        return orderService.fetchOrdersOfCustomer(loggedInCustomer.getCustomerId());
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<OrderResponseDTO>> getMyOrderById(@PathVariable Integer orderId) {
        return orderService.fetchOrderById(orderId);
    }

    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<OrderResponseDTO>> cancelMyOrder(@PathVariable Integer orderId) {
        return orderService.cancelOrder(orderId);
    }
}
