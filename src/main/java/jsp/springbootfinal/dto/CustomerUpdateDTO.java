package jsp.springbootfinal.dto;

public class CustomerUpdateDTO {
    private String customerName;
    private String emailId;
    private Long contactNumber;
    private String address;

    public CustomerUpdateDTO() {}

    public CustomerUpdateDTO(String customerName, String emailId, Long contactNumber, String address) {
        this.customerName = customerName;
        this.emailId = emailId;
        this.contactNumber = contactNumber;
        this.address = address;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Long getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(Long contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
