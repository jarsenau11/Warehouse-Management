package com.project1.warehouse_management.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project1.warehouse_management.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    public Optional<Product> findById(long productId);

    // @Query("DELETE p FROM Product p WHERE i.productType.productTypeId = :productTypeId")
    // @Transactional
    // @Modifying
    // public void deleteByProductTypeId(long productTypeId); 
}