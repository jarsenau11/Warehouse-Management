/*
 * ProductTypeService - handles requests from the ProductTypeController
 */

package com.project1.warehouse_management.services;

import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.repositories.ProductTypeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductTypeService {

  @Autowired ProductTypeRepository productTypeRepository;

  // Retrieves all product types from the database
  public List<ProductType> findAllProductTypes() {
    return productTypeRepository.findAll();
  }

  // Retrieves a product type based on productTypeId
  public ProductType findProductTypeById(long productTypeId) {
    Optional<ProductType> productType = productTypeRepository.findById(productTypeId);
    if (productType.isPresent()) {
      return productType.get();
    }
    return null;
  }

  // Adds a new product type to the database
  public ProductType createProductType(ProductType productType) {
    return productTypeRepository.save(productType);
  }

  // Updates an existing product type in the database
  public ProductType updateProductType(ProductType productType) {
    return productTypeRepository.save(productType);
  }

  // Deletes an existing product type from the database
  public void deleteProductType(ProductType productType) {
    productTypeRepository.delete(productType);
  }
}
