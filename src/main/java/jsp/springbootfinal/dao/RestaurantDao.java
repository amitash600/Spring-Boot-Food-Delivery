package jsp.springbootfinal.dao;



import java.util.List;

import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Repository;



import jsp.springbootfinal.entity.Restaurant;

import jsp.springbootfinal.repository.RestaurantRepository;



@Repository

public class RestaurantDao {



    @Autowired

    private RestaurantRepository restaurantRepository;



    public Restaurant saveRestaurant(Restaurant restaurant) {

        return restaurantRepository.save(restaurant);

    }



    public List<Restaurant> fetchAllRestaurants() {

        return restaurantRepository.findAll();

    }

    

    public Optional<Restaurant> fetchRestaurantById(Integer id){

        return restaurantRepository.findById(id);

    }

    

    public void deleteRestaurant(Integer id) {

        restaurantRepository.deleteById(id);

    }

    

    public List<Restaurant> fetchRestaurantByLocation(String location) {

        return restaurantRepository.findByLocation(location);

    }

    

    public List<Restaurant> fetchRestaurantByName(String name){

        return restaurantRepository.findByRestaurantName(name);

    }

    

    public Page<Restaurant> getRestaurantBySortingAndPage(Integer pN, Integer pS, String field, String order) {



        Sort sort;



        if(order.equalsIgnoreCase("asc")) {

            sort = Sort.by(field).ascending();

        } else {

            sort = Sort.by(field).descending();

        }



        return restaurantRepository.findAll(PageRequest.of(pN, pS, sort));

    }

    

    public Page<Restaurant> getRestaurantsByLocationWithSortingAndPage(String location, Integer pN, Integer pS, String field, String order) {

        

        Sort sort;



        if(order.equalsIgnoreCase("asc")) {

            sort = Sort.by(field).ascending();

        } else {

            sort = Sort.by(field).descending();

        }

        

        return restaurantRepository.findByLocation(location, PageRequest.of(pN, pS, sort));

    }

    

    public Page<Restaurant> getRestaurantsByNameWithSortingAndPage(String name, Integer pN, Integer pS, String field, String order) {

        

        Sort sort;



        if(order.equalsIgnoreCase("asc")) {

            sort = Sort.by(field).ascending();

        } else {

            sort = Sort.by(field).descending();

        }

        

        return restaurantRepository.findByRestaurantName(name, PageRequest.of(pN, pS, sort));

    }



}