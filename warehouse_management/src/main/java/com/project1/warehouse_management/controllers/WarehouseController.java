/*
 * WarehouseController - handles incoming HTTP requests for our warehouses
 */

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

    // GET all warehouses in the database
    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouses =  warehouseService.findAllWarehouses();

        if(warehouses == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    // GET a warehouse by id
    @GetMapping("warehouse/{warehouseId}")
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable long warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouseById(warehouseId);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }
    
    // POST a new warehouse
    @PostMapping("/newWarehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse newWarehouse = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.CREATED);
    }

    // PUT (update) a warehouse
    @PutMapping("/warehouse/updateWarehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse updatedWarehouse = warehouseService.updateWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(updatedWarehouse, HttpStatus.OK);

    }

    // DELETE a warehouse by id
    @DeleteMapping("/warehouse/delete/{warehouseId}")
    public ResponseEntity<Warehouse> deleteWarehouse(@PathVariable long warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouseById(warehouseId);
        warehouseService.deleteWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(HttpStatus.NO_CONTENT);
    }
}
