package jsp.springbootfinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jsp.springbootfinal.dto.ResponseStructure;
import jsp.springbootfinal.entity.MenuItem;
import jsp.springbootfinal.service.MenuItemService;

@RestController
@RequestMapping("/api/menuitems")
public class CustomerMenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<ResponseStructure<List<MenuItem>>> viewAllMenuItems() {
        return menuItemService.fetchAllMenuItems();
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ResponseStructure<List<MenuItem>>> viewMenuItemsByRestaurant(
            @PathVariable Integer restaurantId) {
        return menuItemService.fetchMenuItemsByRestaurant(restaurantId);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<MenuItem>> viewMenuItemById(@PathVariable Integer id) {
        return menuItemService.fetchMenuItemById(id);
    }

    @GetMapping("/priceMoreThan/{price}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<MenuItem>>> viewMenuItemsByPriceGreaterThan(
            @PathVariable Double price) {
        return menuItemService.fetchMenuItemsByPriceGreaterThan(price);
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ResponseStructure<List<MenuItem>>> viewMenuItemsByName(@PathVariable String name) {
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
}
