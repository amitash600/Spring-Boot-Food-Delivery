package jsp.springbootfinal.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jsp.springbootfinal.entity.Payment;
import jsp.springbootfinal.enums.PaymentMethod;
import jsp.springbootfinal.enums.PaymentStatus;
import jsp.springbootfinal.repository.PaymentRepository;

@Repository
public class PaymentDao {
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	public Optional<Payment> getPaymentById(Integer paymentId) {
	    return paymentRepository.findById(paymentId);
	}
	
	public List<Payment> getPaymentByStatus(PaymentStatus status) {
	    return paymentRepository.findByPaymentStatus(status);
	}
	
	public List<Payment> getPaymentByMethod(PaymentMethod method) {
	    return paymentRepository.findByPaymentMethod(method);
	}
	
	public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }

}
