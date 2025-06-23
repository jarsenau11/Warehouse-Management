/*
 * WarehouseRepository
 */

package com.project1.warehouse_management.repositories;

import com.project1.warehouse_management.models.Warehouse;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
  public Optional<Warehouse> findById(long warehouseId);
}
