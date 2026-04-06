package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.MenuItemUpdateDTO;
import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.MenuItem;
import jsp.springbootfinal.service.MenuItemService;

@RestController
@RequestMapping("/api/admin/menuitems")
@PreAuthorize("hasRole('ADMIN')")
public class MenuItemController {

	@Autowired
	private MenuItemService menuItemService;

	@PostMapping
	public ResponseEntity<ResponseStructure<MenuItem>> saveMenuItem(@RequestBody MenuItem menuItem) {
		return menuItemService.saveMenuItem(menuItem);
	}

	@GetMapping
	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchAllMenuItems() {
		return menuItemService.fetchAllMenuItems();
	}

	@GetMapping("/restaurant/{restaurantId}")
	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByRestaurant(
			@PathVariable Integer restaurantId) {
		return menuItemService.fetchMenuItemsByRestaurant(restaurantId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResponseStructure<MenuItem>> fetchMenuItemById(@PathVariable Integer id) {
		return menuItemService.fetchMenuItemById(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ResponseStructure<MenuItem>> updateMenuItem(@PathVariable Integer id,
			@RequestBody MenuItemUpdateDTO menuItemUpdate) {
		return menuItemService.updateMenuItem(id, menuItemUpdate);
	}

	@GetMapping("/priceMoreThan/{price}")
	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByPriceGreaterThan(
			@PathVariable Double price) {
		return menuItemService.fetchMenuItemsByPriceGreaterThan(price);
	}

	@GetMapping("/name/{name}")
	public ResponseEntity<ResponseStructure<List<MenuItem>>> fetchMenuItemsByName(@PathVariable String name) {
		return menuItemService.fetchMenuItemsByName(name);
	}
	
	@GetMapping("/page/{pN}/{pS}/{field}/{order}")
	public ResponseEntity<ResponseStructure<Page<MenuItem>>> getMenuItemsBySortingAndPage(
			@PathVariable Integer pN, @PathVariable Integer pS, @PathVariable String field,
			@PathVariable String order) {
		return menuItemService.getMenuItemsBySortingAndPage(pN, pS, field, order);
	}
	
	@GetMapping("/restaurant/{restaurantId}/page/{pN}/{pS}/{field}/{order}")
	public ResponseEntity<ResponseStructure<Page<MenuItem>>> getMenuItemsByRestaurantWithSortingAndPage(
			@PathVariable Integer restaurantId, @PathVariable Integer pN, @PathVariable Integer pS,
			@PathVariable String field, @PathVariable String order) {
		return menuItemService.getMenuItemsByRestaurantWithSortingAndPage(restaurantId, pN, pS, field, order);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseStructure<String>> deleteMenuItem(@PathVariable Integer id) {
		return menuItemService.deleteMenuItem(id);
	}
}