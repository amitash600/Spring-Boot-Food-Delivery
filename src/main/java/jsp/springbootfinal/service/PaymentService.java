package jsp.springbootfinal.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jsp.springbootfinal.dao.PaymentDao;
import jsp.springbootfinal.dto.PaymentResponseDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.Payment;
import jsp.springbootfinal.enums.PaymentMethod;
import jsp.springbootfinal.enums.PaymentStatus;
import jsp.springbootfinal.error.IdNotFoundException;
import jsp.springbootfinal.error.NoRecordFoundException;

@Service
public class PaymentService {

	@Autowired
	private PaymentDao paymentDao;

	public ResponseEntity<ResponseStructure<PaymentResponseDTO>> getPaymentById(Integer paymentId) {

		Optional<Payment> optional = paymentDao.getPaymentById(paymentId);

		ResponseStructure<PaymentResponseDTO> structure = new ResponseStructure<>();

		if (optional.isPresent()) {

			Payment payment = optional.get();

			// 👇 Inline DTO creation (like your OrderItem code)
			PaymentResponseDTO dto = new PaymentResponseDTO();

			dto.setPaymentId(payment.getPaymentId());
			dto.setPaymentMethod(payment.getPaymentMethod());
			dto.setPaymentStatus(payment.getPaymentStatus());
			dto.setAmount(payment.getAmount());

			if (payment.getOrder() != null) {
				dto.setOrderId(payment.getOrder().getOrderId());
			}

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Payment fetched successfully");
			structure.setData(dto);

			return new ResponseEntity<ResponseStructure<PaymentResponseDTO>>(structure, HttpStatus.OK);

		}

		else {
			throw new IdNotFoundException("Payment not found with given ID");
		}

	}

	public ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>> getPaymentByStatus(PaymentStatus status) {

		List<Payment> payments = paymentDao.getPaymentByStatus(status);

		ResponseStructure<List<PaymentResponseDTO>> structure = new ResponseStructure<>();

		if (payments != null && !payments.isEmpty()) {

			List<PaymentResponseDTO> dtoList = new ArrayList<>();

			for (Payment payment : payments) {

				PaymentResponseDTO dto = new PaymentResponseDTO();

				dto.setPaymentId(payment.getPaymentId());
				dto.setPaymentMethod(payment.getPaymentMethod());
				dto.setPaymentStatus(payment.getPaymentStatus());
				dto.setAmount(payment.getAmount());

				if (payment.getOrder() != null) {
					dto.setOrderId(payment.getOrder().getOrderId());
				}

				dtoList.add(dto);
			}

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Payments fetched successfully");
			structure.setData(dtoList);

			return new ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>>(structure, HttpStatus.OK);

		} else {
			throw new NoRecordFoundException("No payments found with given status");
		}

	}

	public ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>> getPaymentByMethod(PaymentMethod method) {

		List<Payment> payments = paymentDao.getPaymentByMethod(method);

		ResponseStructure<List<PaymentResponseDTO>> structure = new ResponseStructure<>();

		if (payments != null && !payments.isEmpty()) {

			List<PaymentResponseDTO> dtoList = new ArrayList<>();

			for (Payment payment : payments) {

				PaymentResponseDTO dto = new PaymentResponseDTO();

				dto.setPaymentId(payment.getPaymentId());
				dto.setPaymentMethod(payment.getPaymentMethod());
				dto.setPaymentStatus(payment.getPaymentStatus());
				dto.setAmount(payment.getAmount());

				if (payment.getOrder() != null) {
					dto.setOrderId(payment.getOrder().getOrderId());
				}

				dtoList.add(dto);
			}

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Payments fetched by method successfully");
			structure.setData(dtoList);

			return new ResponseEntity<ResponseStructure<List<PaymentResponseDTO>>>(structure, HttpStatus.OK);

		} else {
			throw new NoRecordFoundException("No payments found with given method");
		}

	}

	public ResponseEntity<ResponseStructure<PaymentResponseDTO>> updatePaymentStatus(Integer paymentId,
			PaymentStatus newStatus) {
		
		System.out.println("DEBUG: updatePaymentStatus method called with paymentId: " + paymentId + ", newStatus: " + newStatus);

		Optional<Payment> optional = paymentDao.getPaymentById(paymentId);

		ResponseStructure<PaymentResponseDTO> structure = new ResponseStructure<>();

		if (optional.isPresent()) {

			Payment payment = optional.get();
			PaymentStatus currentStatus = payment.getPaymentStatus();

			// Debug logging
			System.out.println("DEBUG: Current payment status: " + currentStatus);
			System.out.println("DEBUG: New payment status: " + newStatus);

			// Simple test - always block if current is SUCCESS and new is not SUCCESS
			if (currentStatus == PaymentStatus.SUCCESS && newStatus != PaymentStatus.SUCCESS) {
				System.out.println("DEBUG: BLOCKING - SUCCESS cannot be changed to " + newStatus);
				throw new IllegalStateException("SUCCESS payment status cannot be changed to " + newStatus);
			}

			// If we reach here, validation passed (which shouldn't happen for SUCCESS->FAILED)
			System.out.println("DEBUG: VALIDATION PASSED - This should not appear for SUCCESS->FAILED");
			System.out.println("DEBUG: About to save payment with new status: " + newStatus);

			payment.setPaymentStatus(newStatus);
			Payment updatedPayment = paymentDao.save(payment);

			PaymentResponseDTO dto = new PaymentResponseDTO();

			dto.setPaymentId(updatedPayment.getPaymentId());
			dto.setPaymentMethod(updatedPayment.getPaymentMethod());
			dto.setPaymentStatus(updatedPayment.getPaymentStatus());
			dto.setAmount(updatedPayment.getAmount());

			if (updatedPayment.getOrder() != null) {
				dto.setOrderId(updatedPayment.getOrder().getOrderId());
			}

			structure.setStatusCode(HttpStatus.OK.value());
			structure.setMessage("Payment status updated successfully");
			structure.setData(dto);

			return new ResponseEntity<ResponseStructure<PaymentResponseDTO>>(structure, HttpStatus.OK);

		} else {
			throw new IdNotFoundException("Payment not found with given ID");
		}

	}

}
