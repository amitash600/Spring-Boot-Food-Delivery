package jsp.springbootfinal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.PaymentResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class CustomerPaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{paymentId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<PaymentResponseDTO>> getMyPaymentById(@PathVariable Integer paymentId) {
        return paymentService.getPaymentById(paymentId);
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<PaymentResponseDTO>> getPaymentByOrderId(@PathVariable Integer orderId) {
        return null;
    }
}
