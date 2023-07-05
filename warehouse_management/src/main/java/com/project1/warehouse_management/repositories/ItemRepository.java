package com.project1.warehouse_management.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project1.warehouse_management.models.Item;
// import com.project1.warehouse_management.models.Warehouse;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    // public Optional<List<Item>> findItemsByWarehouseId(long warehouseId);

    public Optional<Item> findById(long itemId);

    @Query("SELECT i FROM Item i WHERE i.warehouse.warehouseId = :warehouseId")
    @Transactional(readOnly = true)
    public Optional<List<Item>> findItemsByWarehouseId(long warehouseId);

    

}
