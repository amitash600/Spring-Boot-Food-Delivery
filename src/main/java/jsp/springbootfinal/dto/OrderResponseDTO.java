package jsp.springbootfinal.dto;

import java.time.LocalDateTime;
import java.util.List;

import jsp.springbootfinal.entity.Payment;
import jsp.springbootfinal.enums.Status;

public class OrderResponseDTO {

    private Integer orderId;
    private LocalDateTime orderDateTime;
    private Status status;
    private double totalAmount;
    private String deliveryAddress;
    private String recipientName;
    private String specialInstructions;

    private CustomerResponseDTO customer;

    private Payment payment;

    private List<OrderItemResponseDTO> orderItems;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDateTime() {
        return orderDateTime;
    }

    public void setOrderDateTime(LocalDateTime orderDateTime) {
        this.orderDateTime = orderDateTime;
    }

    public Status getStatus() {
        return status;
    }

    public List<OrderItemResponseDTO> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemResponseDTO> orderItems) {
		this.orderItems = orderItems;
	}

	public void setStatus(Status status) {
        this.status = status;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public CustomerResponseDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerResponseDTO customer) {
        this.customer = customer;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

   
}