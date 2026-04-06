package jsp.springbootfinal.dto;

import jsp.springbootfinal.enums.PaymentStatus;

public class PaymentStatusUpdateRequestDTO {
    private PaymentStatus paymentStatus;

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
