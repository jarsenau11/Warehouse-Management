package com.project1.warehouse_management.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.services.WarehouseService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("warehouses")
public class WarehouseController {
    
    @Autowired
    WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouse =  warehouseService.findAllWarehouses();

        if(warehouse == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Warehouse>>(warehouse, HttpStatus.OK);
    }

    @GetMapping("warehouse/{warehouseId}")
    public ResponseEntity<Warehouse> findByItemId(@PathVariable long warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouseById(warehouseId);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }
    
    @PostMapping("/newWarehouse")
    public ResponseEntity<Warehouse> createItem(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
    }

    @PutMapping("/warehouse/updateWarehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse updatedWarehouse = warehouseService.updateWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(updatedWarehouse, HttpStatus.OK);

    }

    @DeleteMapping("/warehouse/delete/{warehouseId}")
    public ResponseEntity<Warehouse> deleteItem(@PathVariable long warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouseById(warehouseId);
        warehouseService.deleteWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(HttpStatus.NO_CONTENT);
    }
}