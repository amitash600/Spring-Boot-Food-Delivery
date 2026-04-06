package jsp.springbootfinal.dto;

public class MenuItemUpdateDTO {
    private String itemName;
    private Double price;
    private Boolean availability;
    private Integer restaurantId;

    public MenuItemUpdateDTO() {}

    public MenuItemUpdateDTO(String itemName, Double price, Boolean availability, Integer restaurantId) {
        this.itemName = itemName;
        this.price = price;
        this.availability = availability;
        this.restaurantId = restaurantId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }
}
