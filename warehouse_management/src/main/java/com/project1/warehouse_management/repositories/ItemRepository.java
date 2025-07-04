/*
 * ItemRepository
 */

package com.project1.warehouse_management.repositories;

import com.project1.warehouse_management.models.Item;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  public Optional<Item> findById(long itemId);

  // Query to retrieve all items in a warehouse with the given warehouseId
  @Query("SELECT i FROM Item i WHERE i.warehouse.warehouseId = :warehouseId")
  @Transactional(readOnly = true)
  public Optional<List<Item>> findItemsByWarehouseId(long warehouseId);

  // Query to retrieve all items associated with specific product based on productId
  @Query("SELECT i FROM Item i WHERE i.product.productId = :productId")
  @Transactional(readOnly = true)
  public Optional<List<Item>> findItemsByProductId(long productId);

  // Query to retrieve all items associated with products that are associated with a specific
  // product type based on productTypeId
  @Query("SELECT i FROM Item i WHERE i.product.productType.productTypeId = :productTypeId")
  @Transactional(readOnly = true)
  public Optional<List<Item>> findItemsByProductTypeId(long productTypeId);
}
