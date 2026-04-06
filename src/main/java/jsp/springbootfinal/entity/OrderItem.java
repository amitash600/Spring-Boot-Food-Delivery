package jsp.springbootfinal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderItemId;
	@Column(nullable=false)
	private Integer quantity;
	
	private Double subTotal;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	
	
	
	@ManyToOne
	@JoinColumn(name = "menu_item_id")
	private MenuItem menuItem;


	public Integer getOrderItemId() {
		return orderItemId;
	}


	public void setOrderItemId(Integer orderItemId) {
		this.orderItemId = orderItemId;
	}


	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public Double getSubTotal() {
		return subTotal;
	}


	public void setSubTotal(Double subTotal) {
		this.subTotal = subTotal;
	}


	public Order getOrder() {
		return order;
	}


	public void setOrder(Order order) {
		this.order = order;
	}


	public MenuItem getMenuItem() {
		return menuItem;
	}


	public void setMenuItem(MenuItem menuItem) {
		this.menuItem = menuItem;
	}
	
	

}
