package jsp.springbootfinal.dto;


import jsp.springbootfinal.enums.Status;

public class OrderStatusUpdateRequestDTO {

    private Status status;

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
