package com.project1.warehouse_management.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.repositories.ProductTypeRepository;

@Service
public class ProductTypeService {
    
    @Autowired
    ProductTypeRepository productTypeRepository;

    public List<ProductType> findAllProductTypes() {
        return productTypeRepository.findAll();
    }

    public ProductType findProductTypeById(long productTypeId) {
        Optional<ProductType> productType = productTypeRepository.findById(productTypeId);
        if(productType.isPresent()) {
            return productType.get();
        }
        return null;
    }

    public ProductType createProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public ProductType updateProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public void deleteProductType(ProductType productType) {
        productTypeRepository.delete(productType);
    }

}
