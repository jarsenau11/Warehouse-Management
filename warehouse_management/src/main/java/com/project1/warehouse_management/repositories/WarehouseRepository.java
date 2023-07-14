/*
 * WarehouseRepository
 */

package com.project1.warehouse_management.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project1.warehouse_management.models.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    public Optional<Warehouse> findById(long warehouseId);
}
