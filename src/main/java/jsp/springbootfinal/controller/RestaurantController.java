package jsp.springbootfinal.controller;



import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;



import jsp.springbootfinal.dto.ResponseStructure;

import jsp.springbootfinal.entity.Restaurant;

import jsp.springbootfinal.service.RestaurantService;



@RestController

@RequestMapping("/api/admin/restaurants")

@PreAuthorize("hasRole('ADMIN')")

public class RestaurantController {



	@Autowired

	private RestaurantService restaurantService;



	@PostMapping

	public ResponseEntity<ResponseStructure<Restaurant>> saveRestaurant(@RequestBody Restaurant restaurant) {

		return restaurantService.saveRestaurant(restaurant);

	}



	@GetMapping

	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchAllRestaurants() {

		return restaurantService.fetchAllRestaurants();

	}



	@GetMapping("/{id}")

	public ResponseEntity<ResponseStructure<Restaurant>> fetchRestaurantById(@PathVariable Integer id) {

		return restaurantService.fetchRestaurantById(id);

	}



	@GetMapping("/location/{location}")

	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchRestaurantByLocation(

			@PathVariable String location) {

		return restaurantService.fetchRestaurantByLocation(location);

	}



	@GetMapping("/name/{name}")

	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchRestaurantByName(@PathVariable String name) {

		return restaurantService.fetchRestaurantByName(name);

	}



	@GetMapping("/page/{pN}/{pS}/{field}/{order}")

	public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantBySortingAndPage(

			@PathVariable Integer pN, @PathVariable Integer pS, @PathVariable String field,

			@PathVariable String order) {

		return restaurantService.getRestaurantBySortingAndPage(pN, pS, field, order);

	}



	@PutMapping("/{id}")

	public ResponseEntity<ResponseStructure<Restaurant>> updateRestaurant(@PathVariable Integer id,

			@RequestBody Restaurant restaurant) {

		return restaurantService.updateRestaurant(id, restaurant);

	}



	@DeleteMapping("/{id}")

	public ResponseEntity<ResponseStructure<Restaurant>> deleteRestaurant(@PathVariable Integer id) {

		return restaurantService.deleteRestaurant(id);

	}

}