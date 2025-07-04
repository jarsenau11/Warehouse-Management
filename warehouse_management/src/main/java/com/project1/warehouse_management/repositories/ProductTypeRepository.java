/*
 * ProductTypeRepository
 */

package com.project1.warehouse_management.repositories;

import com.project1.warehouse_management.models.ProductType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
  public Optional<ProductType> findById(long productTypeId);
}
