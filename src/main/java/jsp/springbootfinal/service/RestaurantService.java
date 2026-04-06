package jsp.springbootfinal.service;



import java.util.List;

import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;



import jsp.springbootfinal.dao.RestaurantDao;

import jsp.springbootfinal.dto.ResponseStructure;

import jsp.springbootfinal.entity.Restaurant;

import jsp.springbootfinal.error.NoRecordFoundException;



@Service

public class RestaurantService {



	@Autowired

	private RestaurantDao restaurantDao;



	public ResponseEntity<ResponseStructure<Restaurant>> saveRestaurant(Restaurant restaurant) {

		Restaurant r = restaurantDao.saveRestaurant(restaurant);



		ResponseStructure<Restaurant> res = new ResponseStructure<>();



		res.setStatusCode(HttpStatus.CREATED.value());



		res.setMessage("Restaurant saved successfully");



		res.setData(r);



		return new ResponseEntity<>(res, HttpStatus.CREATED);



	}



	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchAllRestaurants() {



		List<Restaurant> list = restaurantDao.fetchAllRestaurants();



		ResponseStructure<List<Restaurant>> res = new ResponseStructure<>();



		if (list.isEmpty()) {



			throw new NoRecordFoundException("No restaurants found");



		} else {

			res.setStatusCode(HttpStatus.OK.value());
			res.setMessage("Restaurants fetched successfully");
			res.setData(list);

			return new ResponseEntity<>(res, HttpStatus.OK);

		}

	}


	public ResponseEntity<ResponseStructure<Restaurant>> fetchRestaurantById(Integer id) {



		Optional<Restaurant> optional = restaurantDao.fetchRestaurantById(id);



		ResponseStructure<Restaurant> res = new ResponseStructure<>();



		if (optional.isPresent()) {



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurant fetched successfully");



			res.setData(optional.get());



			return new ResponseEntity<>(res, HttpStatus.OK);



		} else {



			throw new NoRecordFoundException("Restaurant not found");



		}



	}



	public ResponseEntity<ResponseStructure<Restaurant>> updateRestaurant(Integer id, Restaurant restaurant) {



		Optional<Restaurant> optional = restaurantDao.fetchRestaurantById(id);



		ResponseStructure<Restaurant> res = new ResponseStructure<>();



		if (optional.isPresent()) {



			Restaurant existing = optional.get();



			existing.setRestaurantName(restaurant.getRestaurantName());



			existing.setLocation(restaurant.getLocation());



			Restaurant updated = restaurantDao.saveRestaurant(existing);



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurant updated successfully");



			res.setData(updated);



			return new ResponseEntity<>(res, HttpStatus.OK);



		} else {



			throw new NoRecordFoundException("Restaurant not found");



		}



	}



	public ResponseEntity<ResponseStructure<Restaurant>> deleteRestaurant(Integer id) {



		Optional<Restaurant> optional = restaurantDao.fetchRestaurantById(id);



		ResponseStructure<Restaurant> res = new ResponseStructure<>();



		if (optional.isPresent()) {



			restaurantDao.deleteRestaurant(id);



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurant deleted successfully");



			res.setData(optional.get());



			return new ResponseEntity<>(res, HttpStatus.OK);



		} else {



			throw new NoRecordFoundException("Restaurant not found");



		}



	}



	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchRestaurantByLocation(String location) {



		List<Restaurant> list = restaurantDao.fetchRestaurantByLocation(location);



		ResponseStructure<List<Restaurant>> res = new ResponseStructure<>();



		if (list.isEmpty()) {



			throw new NoRecordFoundException("No restaurants found in location: " + location);



		} else {



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurants fetched successfully by location");



			res.setData(list);



			return new ResponseEntity<>(res, HttpStatus.OK);



		}



	}



	public ResponseEntity<ResponseStructure<List<Restaurant>>> fetchRestaurantByName(String restaurantName) {



		List<Restaurant> list = restaurantDao.fetchRestaurantByName(restaurantName);



		ResponseStructure<List<Restaurant>> res = new ResponseStructure<>();



		if (list.isEmpty()) {



			throw new NoRecordFoundException("No restaurants found with name: " + restaurantName);



		} else {



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurants fetched successfully by name");



			res.setData(list);



			return new ResponseEntity<>(res, HttpStatus.OK);



		}



	}



	public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantBySortingAndPage(Integer pN, Integer pS,

			String field, String order) {



		Page<Restaurant> page = restaurantDao.getRestaurantBySortingAndPage(pN, pS, field, order);



		ResponseStructure<Page<Restaurant>> res = new ResponseStructure<>();



		if (!page.isEmpty()) {



			res.setStatusCode(HttpStatus.OK.value());



			res.setMessage("Restaurants fetched successfully");



			res.setData(page);



			return new ResponseEntity<>(res, HttpStatus.OK);



		} else {



			throw new NoRecordFoundException("No restaurants found");



		}



	}

	

	public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantsByLocationWithSortingAndPage(String location, Integer pN, Integer pS,

			String field, String order) {

		

		Page<Restaurant> page = restaurantDao.getRestaurantsByLocationWithSortingAndPage(location, pN, pS, field, order);

		

		ResponseStructure<Page<Restaurant>> res = new ResponseStructure<>();

		

		if (!page.isEmpty()) {

			

			res.setStatusCode(HttpStatus.OK.value());

			

			res.setMessage("Restaurants fetched successfully by location with pagination and sorting");

			

			res.setData(page);

			

			return new ResponseEntity<>(res, HttpStatus.OK);

			

		} else {

			

			throw new NoRecordFoundException("No restaurants found for location: " + location);

			

		}

		

	}

	

	public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantsByNameWithSortingAndPage(String name, Integer pN, Integer pS,

			String field, String order) {

		

		Page<Restaurant> page = restaurantDao.getRestaurantsByNameWithSortingAndPage(name, pN, pS, field, order);

		

		ResponseStructure<Page<Restaurant>> res = new ResponseStructure<>();

		

		if (!page.isEmpty()) {

			

			res.setStatusCode(HttpStatus.OK.value());

			

			res.setMessage("Restaurants fetched successfully by name with pagination and sorting");

			

			res.setData(page);

			

			return new ResponseEntity<>(res, HttpStatus.OK);

			

		} else {

			

			throw new NoRecordFoundException("No restaurants found for name: " + name);

			

		}

		

	}



}
