package com.project1.warehouse_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.services.ItemService;

@RestController
@RequestMapping("/items")
public class ItemController {
    
    @Autowired
    ItemService itemService;


    @GetMapping
    public ResponseEntity<List<Item>> findAllItems() {
        List<Item> items = itemService.findAllItems();

        if(items == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<Item>> findItemsByWarehouseId(@PathVariable long warehouseId) {
        List<Item> items = itemService.findItemsByWarehouseId(warehouseId);

        if(items == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<Item> findByItemId(@PathVariable long itemId) {
        Item item = itemService.findById(itemId);
        return new ResponseEntity<Item>(item, HttpStatus.OK);
    }

    @PostMapping("/newItem")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item newItem = itemService.createItem(item);
        return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
    }

    @DeleteMapping("/item/delete/{itemId}")
    public ResponseEntity<Item> deleteItem(@PathVariable long itemId) {
        Item item = itemService.findById(itemId);
        itemService.deleteItem(item);
        return new ResponseEntity<Item>(HttpStatus.NO_CONTENT);
    }
}