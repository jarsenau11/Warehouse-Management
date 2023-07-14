package com.project1.warehouse_management.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.repositories.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    ProductRepository productRepository;

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductById(long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent()) {
            return product.get();
        }
        return null;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    public void deleteProducts(List<Product> products) {
        productRepository.deleteAll(products);
    }

    // public void deleteProductByProductTypeId(long productTypeId) {
    //     productRepository.deleteByProductTypeId(productTypeId);
    // }

}
