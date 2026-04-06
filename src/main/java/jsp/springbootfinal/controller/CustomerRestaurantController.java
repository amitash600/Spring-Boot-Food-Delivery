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
@RequestMapping("/api/restaurants")
public class CustomerRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<ResponseStructure<List<Restaurant>>> viewAllRestaurants() {
        return restaurantService.fetchAllRestaurants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Restaurant>> viewRestaurantById(@PathVariable Integer id) {
        return restaurantService.fetchRestaurantById(id);
    }

    @GetMapping("/location/{location}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<Restaurant>>> viewRestaurantsByLocation(
            @PathVariable String location) {
        return restaurantService.fetchRestaurantByLocation(location);
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<Restaurant>>> viewRestaurantsByName(@PathVariable String name) {
        return restaurantService.fetchRestaurantByName(name);
    }

    @GetMapping("/page/{pN}/{pS}/{field}/{order}")
    public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantsBySortingAndPage(
            @PathVariable Integer pN, @PathVariable Integer pS, @PathVariable String field,
            @PathVariable String order) {
        return restaurantService.getRestaurantBySortingAndPage(pN, pS, field, order);
    }
    
    @GetMapping("/location/{location}/page/{pN}/{pS}/{field}/{order}")
    public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantsByLocationWithSortingAndPage(
            @PathVariable String location, @PathVariable Integer pN, @PathVariable Integer pS,
            @PathVariable String field, @PathVariable String order) {
        return restaurantService.getRestaurantsByLocationWithSortingAndPage(location, pN, pS, field, order);
    }
    
    @GetMapping("/name/{name}/page/{pN}/{pS}/{field}/{order}")
    public ResponseEntity<ResponseStructure<Page<Restaurant>>> getRestaurantsByNameWithSortingAndPage(
            @PathVariable String name, @PathVariable Integer pN, @PathVariable Integer pS,
            @PathVariable String field, @PathVariable String order) {
        return restaurantService.getRestaurantsByNameWithSortingAndPage(name, pN, pS, field, order);
    }
}
