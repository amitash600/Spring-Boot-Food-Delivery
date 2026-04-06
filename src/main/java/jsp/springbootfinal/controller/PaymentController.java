package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.PaymentResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.enums.PaymentMethod;
import jsp.springbootfinal.enums.PaymentStatus;
import jsp.springbootfinal.service.PaymentService;

@RestController
@RequestMapping("/api/admin/payments")
@PreAuthorize("hasRole('ADMIN')")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@GetMapping("/{paymentId}")
	public ResponseEntity<ResponseStructure<PaymentResponseDTO>> getById(@PathVariable Integer paymentId) {
		return paymentService.getPaymentById(paymentId);
	}

	@GetMapping("/status/{status}")
	public ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>> getByStatus(@PathVariable PaymentStatus status) {
		return paymentService.getPaymentByStatus(status);
	}

	@GetMapping("/method/{method}")
	public ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>> getByMethod(@PathVariable PaymentMethod method) {
		return paymentService.getPaymentByMethod(method);
	}
}
