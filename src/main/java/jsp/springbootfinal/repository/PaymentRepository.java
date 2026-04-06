package jsp.springbootfinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jsp.springbootfinal.entity.Payment;
import jsp.springbootfinal.enums.PaymentMethod;
import jsp.springbootfinal.enums.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
	
	List<Payment> findByPaymentMethod(PaymentMethod paymentMethod);

}
