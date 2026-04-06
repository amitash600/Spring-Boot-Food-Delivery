package jsp.springbootfinal.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import jsp.springbootfinal.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{
	
	  List<Restaurant> findByLocation(String location);
	  
	  List<Restaurant> findByRestaurantName(String restaurantName);
	  
	  Page<Restaurant> findByLocation(String location, Pageable pageable);
	  
	  Page<Restaurant> findByRestaurantName(String restaurantName, Pageable pageable);
}
