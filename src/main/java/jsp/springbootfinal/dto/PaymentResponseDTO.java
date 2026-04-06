package jsp.springbootfinal.dto;

import jsp.springbootfinal.enums.PaymentMethod;
import jsp.springbootfinal.enums.PaymentStatus;

public class PaymentResponseDTO {
	
	  private Integer paymentId;
	    private PaymentMethod paymentMethod;
	    private PaymentStatus paymentStatus;
	    private Double amount;
	    private Integer orderId; // useful for frontend

	    // getters & setters

	    public Integer getPaymentId() {
	        return paymentId;
	    }

	    public void setPaymentId(Integer paymentId) {
	        this.paymentId = paymentId;
	    }

	    public PaymentMethod getPaymentMethod() {
	        return paymentMethod;
	    }

	    public void setPaymentMethod(PaymentMethod paymentMethod) {
	        this.paymentMethod = paymentMethod;
	    }

	    public PaymentStatus getPaymentStatus() {
	        return paymentStatus;
	    }

	    public void setPaymentStatus(PaymentStatus paymentStatus) {
	        this.paymentStatus = paymentStatus;
	    }

	    public Double getAmount() {
	        return amount;
	    }

	    public void setAmount(Double amount) {
	        this.amount = amount;
	    }

	    public Integer getOrderId() {
	        return orderId;
	    }

	    public void setOrderId(Integer orderId) {
	        this.orderId = orderId;
	    }

}
