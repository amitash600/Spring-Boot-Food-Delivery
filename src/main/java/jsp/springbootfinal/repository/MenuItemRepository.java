package jsp.springbootfinal.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import jsp.springbootfinal.entity.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer>{
	 List<MenuItem> findByRestaurantRestaurantId(Integer restaurantId);
	 
	 List<MenuItem> findByPriceGreaterThan(Double price);
	 
	  List<MenuItem> findByItemName(String itemName);
	  
	  Page<MenuItem> findByRestaurantRestaurantId(Integer restaurantId, Pageable pageable);
	  
	  Page<MenuItem> findAll(Pageable pageable);
}
