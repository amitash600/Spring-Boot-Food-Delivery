package jsp.springbootfinal.dao;



import java.util.List;

import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;



import jsp.springbootfinal.entity.MenuItem;

import jsp.springbootfinal.repository.MenuItemRepository;



@Repository

public class MenuItemDao {



	@Autowired

	private MenuItemRepository menuItemRepository;



	public MenuItem saveMenuItem(MenuItem menuItem) {

		return menuItemRepository.save(menuItem);

	}



	public List<MenuItem> fetchAllMenuItems() {

		return menuItemRepository.findAll();

	}



	public List<MenuItem> fetchMenuItemsByRestaurant(Integer restaurantId) {

		return menuItemRepository.findByRestaurantRestaurantId(restaurantId);

	}



	public Optional<MenuItem> fetchMenuItemById(Integer id) {

		return menuItemRepository.findById(id);

	}



	public List<MenuItem> fetchMenuItemsByPriceGreaterThan(Double price) {

		return menuItemRepository.findByPriceGreaterThan(price);

	}



	public List<MenuItem> fetchMenuItemsByName(String name) {

		return menuItemRepository.findByItemName(name);

	}

	

	public void deleteMenuItem(Integer id){

	    menuItemRepository.deleteById(id);

	}
	
	public Page<MenuItem> getMenuItemsBySortingAndPage(Integer pN, Integer pS, String field, String order) {
		
		Sort sort;
		
		if(order.equalsIgnoreCase("asc")) {
			sort = Sort.by(field).ascending();
		} else {
			sort = Sort.by(field).descending();
		}
		
		return menuItemRepository.findAll(PageRequest.of(pN, pS, sort));
	}
	
	public Page<MenuItem> getMenuItemsByRestaurantWithSortingAndPage(Integer restaurantId, Integer pN, Integer pS, String field, String order) {
		
		Sort sort;
		
		if(order.equalsIgnoreCase("asc")) {
			sort = Sort.by(field).ascending();
		} else {
			sort = Sort.by(field).descending();
		}
		
		return menuItemRepository.findByRestaurantRestaurantId(restaurantId, PageRequest.of(pN, pS, sort));
	}

}