/*
 * ItemController - handles incoming HTTP requests for our items
 */

package com.project1.warehouse_management.controllers;

import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.services.ItemService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/items")
public class ItemController {

  @Autowired ItemService itemService;

  // GET all items in the database
  @GetMapping
  public ResponseEntity<List<Item>> findAllItems() {
    List<Item> items = itemService.findAllItems();

    if (items == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
  }

  // GET all items in a specific warehouse
  @GetMapping("/warehouse/{warehouseId}")
  public ResponseEntity<List<Item>> findItemsByWarehouseId(@PathVariable long warehouseId) {
    List<Item> items = itemService.findItemsByWarehouseId(warehouseId);

    if (items == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
  }

  // GET all items based on a product
  @GetMapping("/product/{productId}")
  public ResponseEntity<List<Item>> findItemsByProductId(@PathVariable long productId) {
    List<Item> items = itemService.findItemsByProductId(productId);

    if (items == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
  }

  // GET all items based on a product type
  @GetMapping("/productType/{productTypeId}")
  public ResponseEntity<List<Item>> findItemsByProductTypeId(@PathVariable long productTypeId) {
    List<Item> items = itemService.findItemsByProductTypeId(productTypeId);

    if (items == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
  }

  // GET a specific item by id
  @GetMapping("/item/{itemId}")
  public ResponseEntity<Item> findByItemId(@PathVariable long itemId) {
    Item item = itemService.findById(itemId);
    return new ResponseEntity<Item>(item, HttpStatus.OK);
  }

  // POST a new item
  @PostMapping("/newItem")
  public ResponseEntity<Item> createItem(@RequestBody Item item) {
    Item newItem = itemService.createItem(item);
    return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
  }

  // POST a list of new items
  @PostMapping("/newItems")
  public ResponseEntity<List<Item>> createItems(@RequestBody List<Item> items) {
    List<Item> newItems = itemService.createItems(items);
    return new ResponseEntity<List<Item>>(newItems, HttpStatus.CREATED);
  }

  // PUT (update) a specific item
  @PutMapping("/item/updateItem")
  public ResponseEntity<Item> updateItem(@RequestBody Item item) {
    Item updatedItem = itemService.updateItem(item);
    return new ResponseEntity<Item>(updatedItem, HttpStatus.OK);
  }

  // DELETE an item by id
  @DeleteMapping("/item/delete/{itemId}")
  public ResponseEntity<Item> deleteItem(@PathVariable long itemId) {
    Item item = itemService.findById(itemId);
    itemService.deleteItem(item);
    return new ResponseEntity<Item>(HttpStatus.NO_CONTENT);
  }

  // DELETE a list of items
  @DeleteMapping("/delete/items")
  public ResponseEntity<Item> deleteItems(@RequestBody List<Item> items) {
    itemService.deleteItems(items);
    return new ResponseEntity<Item>(HttpStatus.NO_CONTENT);
  }
}
