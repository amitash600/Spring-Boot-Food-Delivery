package jsp.springbootfinal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jsp.springbootfinal.dao.MenuItemDao;
import jsp.springbootfinal.dao.RestaurantDao;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.MenuItem;
import jsp.springbootfinal.dto.MenuItemUpdateDTO;
import jsp.springbootfinal.entity.Restaurant;
import jsp.springbootfinal.error.NoRecordFoundException;

@Service
public class MenuItemService {

	@Autowired
	private MenuItemDao menuItemDao;

	@Autowired
	private RestaurantDao restaurantDao;

	public ResponseEntity<ResponseStructure<MenuItem>> saveMenuItem(MenuItem menuItem) {

		Integer restaurantId = menuItem.getRestaurant().getRestaurantId();

		Optional<Restaurant> optional = restaurantDao.fetchRestaurantById(restaurantId);

		if (optional.isEmpty()) {
			throw new NoRecordFoundException("Restaurant not found");
		}

		// price validation
		if (menuItem.getPrice() < 0) {
			throw new DataIntegrityViolationException("Price cannot be negative");
		}

		// availability must exist but can be true or false
		if (menuItem.getAvailability() == null) {
			throw new DataIntegrityViolationException("Availability must be specified");
		}

		Restaurant restaurant = optional.get();

		// attach restaurant automatically
		menuItem.setRestaurant(restaurant);

		MenuItem saved = menuItemDao.saveMenuItem(menuItem);

		ResponseStructure<MenuItem> res = new ResponseStructure<>();

		res.setStatusCode(HttpStatus.CREATED.value());
		res.setMessage("Menu item saved successfully");
		res.setData(saved);

		return new ResponseEntity<ResponseStructure<MenuItem>>(res, HttpStatus.CREATED);
	}

	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchAllMenuItems() {

		List<MenuItem> items = menuItemDao.fetchAllMenuItems();

		ResponseStructure<List<MenuItem>> res = new ResponseStructure<>();

		if (!items.isEmpty()) {

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully");
			res.setData(items);

			return new ResponseEntity<ResponseStructure<List<MenuItem>>>(res, HttpStatus.OK);

		} else {

			throw new NoRecordFoundException("MenuItem table is empty");

		}
	}

	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByRestaurant(Integer restaurantId) {

		List<MenuItem> items = menuItemDao.fetchMenuItemsByRestaurant(restaurantId);

		ResponseStructure<List<MenuItem>> res = new ResponseStructure<>();

		if (!items.isEmpty()) {

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully");
			res.setData(items);

			return new ResponseEntity<ResponseStructure<List<MenuItem>>>(res, HttpStatus.OK);

		} else {

			throw new NoRecordFoundException("No menu items found for this restaurant");

		}
	}

	public ResponseEntity<ResponseStructure<MenuItem>> fetchMenuItemById(Integer id) {

		Optional<MenuItem> optional = menuItemDao.fetchMenuItemById(id);

		ResponseStructure<MenuItem> res = new ResponseStructure<>();

		if (optional.isPresent()) {

			MenuItem item = optional.get();

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu item fetched successfully");
			res.setData(item);

			return new ResponseEntity<ResponseStructure<MenuItem>>(res, HttpStatus.OK);

		} else {

			throw new NoRecordFoundException("Menu item ID not found");

		}
	}

	public ResponseEntity<ResponseStructure<MenuItem>> updateMenuItem(Integer id, MenuItemUpdateDTO menuItem) {

		Optional<MenuItem> optional = menuItemDao.fetchMenuItemById(id);

		if (optional.isPresent()) {

			MenuItem existing = optional.get();

			// price validation
			if (menuItem.getPrice() < 0) {
				throw new DataIntegrityViolationException("Price cannot be negative");
			}

			Integer restaurantId = existing.getRestaurant().getRestaurantId();

			Optional<Restaurant> restaurantOptional = restaurantDao.fetchRestaurantById(restaurantId);

			if (restaurantOptional.isEmpty()) {
				throw new NoRecordFoundException("Restaurant not found");
			}

			existing.setItemName(menuItem.getItemName());
			existing.setPrice(menuItem.getPrice());
			existing.setAvailability(menuItem.getAvailability());

			MenuItem updated = menuItemDao.saveMenuItem(existing);

			ResponseStructure<MenuItem> res = new ResponseStructure<>();

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu item updated successfully");
			res.setData(updated);

			return new ResponseEntity<ResponseStructure<MenuItem>>(res, HttpStatus.OK);
		} else {
			throw new NoRecordFoundException("MenuItem ID not found");
		}
	}

	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByPriceGreaterThan(Double price) {

		List<MenuItem> items = menuItemDao.fetchMenuItemsByPriceGreaterThan(price);

		ResponseStructure<List<MenuItem>> res = new ResponseStructure<>();

		if (!items.isEmpty()) {

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully");
			res.setData(items);

			return new ResponseEntity<ResponseStructure<List<MenuItem>>>(res, HttpStatus.OK);

		} else {

			throw new NoRecordFoundException("No menu items found with price greater than " + price);

		}
	}

	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByName(String name) {

		List<MenuItem> items = menuItemDao.fetchMenuItemsByName(name);

		ResponseStructure<List<MenuItem>> res = new ResponseStructure<>();

		if (!items.isEmpty()) {

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully");
			res.setData(items);

			return new ResponseEntity<>(res, HttpStatus.OK);

		} else {

			throw new NoRecordFoundException("No menu items found with name: " + name);

		}
	}
	
	public ResponseEntity<ResponseStructure<String>> deleteMenuItem(Integer id){

	    Optional<MenuItem> optional = menuItemDao.fetchMenuItemById(id);

	    if(optional.isPresent()){

	        MenuItem item = optional.get();

	        // Check if order items exist
	        if(item.getOrderItems() != null && !item.getOrderItems().isEmpty()){
	            throw new IllegalStateException(
	                "MenuItem cannot be deleted because it is used in orders"
	            );
	        }

	        menuItemDao.deleteMenuItem(id);

	        ResponseStructure<String> res = new ResponseStructure<>();

	        res.setStatusCode(HttpStatus.OK.value());
	        res.setMessage("Menu item deleted successfully");
	        res.setData("Deleted");

	        return new ResponseEntity<>(res,HttpStatus.OK);

	    }else{
	        throw new NoRecordFoundException("MenuItem ID not found");
	    }
	}
	
	// Pagination and Sorting methods
	public ResponseEntity<ResponseStructure<Page<MenuItem>>> getMenuItemsBySortingAndPage(Integer pageNumber, Integer pageSize, String field, String order) {
		Page<MenuItem> page = menuItemDao.getMenuItemsBySortingAndPage(pageNumber, pageSize, field, order);
		
		ResponseStructure<Page<MenuItem>> res = new ResponseStructure<>();
		
		if(page.hasContent()) {
			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully with pagination and sorting");
			res.setData(page);
			
			return new ResponseEntity<>(res, HttpStatus.OK);
		} else {
			throw new NoRecordFoundException("No menu items found");
		}
	}
	
	public ResponseEntity<ResponseStructure<Page<MenuItem>>> getMenuItemsByRestaurantWithSortingAndPage(Integer restaurantId, Integer pageNumber, Integer pageSize, String field, String order) {
		// First check if restaurant exists
		Optional<Restaurant> restaurantOptional = restaurantDao.fetchRestaurantById(restaurantId);
		if(restaurantOptional.isEmpty()) {
			throw new NoRecordFoundException("Restaurant not found with id: " + restaurantId);
		}
		
		Page<MenuItem> page = menuItemDao.getMenuItemsByRestaurantWithSortingAndPage(restaurantId, pageNumber, pageSize, field, order);
		
		ResponseStructure<Page<MenuItem>> res = new ResponseStructure<>();
		
		if(page.hasContent()) {
			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Menu items fetched successfully with pagination and sorting");
			res.setData(page);
			
			return new ResponseEntity<>(res, HttpStatus.OK);
		} else {
			throw new NoRecordFoundException("No menu items found for this restaurant");
		}
	}
}
