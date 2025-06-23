/*
 * WarehouseService - handles requests from the WarehouseController
 */

package com.project1.warehouse_management.services;

import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.repositories.WarehouseRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WarehouseService {

  @Autowired WarehouseRepository warehouseRepository;

  // Retrieves all warehouses from the database
  public List<Warehouse> findAllWarehouses() {
    return warehouseRepository.findAll();
  }

  // Retrieves a warehouse based on warehouseId
  public Warehouse findWarehouseById(long warehouseId) {
    Optional<Warehouse> warehouse = warehouseRepository.findById(warehouseId);
    if (warehouse.isPresent()) {
      return warehouse.get();
    }
    return null;
  }

  // Adds a new warehouse to the database
  public Warehouse createWarehouse(Warehouse warehouse) {
    return warehouseRepository.save(warehouse);
  }

  // Updates an existing warehouse in the database
  public Warehouse updateWarehouse(Warehouse warehouse) {
    return warehouseRepository.save(warehouse);
  }

  // Deletes an existing warehouse in the database
  public void deleteWarehouse(Warehouse warehouse) {
    warehouseRepository.delete(warehouse);
  }
}
