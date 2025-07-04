/*
 * ProductService - handles requests from the ProductController
 */

package com.project1.warehouse_management.services;

import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.repositories.ProductRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

  @Autowired ProductRepository productRepository;

  // Retrieve all products from the database
  public List<Product> findAllProducts() {
    return productRepository.findAll();
  }

  // Retrieves a product from the database based on productId
  public Product findProductById(long productId) {
    Optional<Product> product = productRepository.findById(productId);
    if (product.isPresent()) {
      return product.get();
    }
    return null;
  }

  // Adds a new product to the database
  public Product createProduct(Product product) {
    return productRepository.save(product);
  }

  // Updates an existing product in the database
  public Product updateProduct(Product product) {
    return productRepository.save(product);
  }

  // Delete a product from the database
  public void deleteProduct(Product product) {
    productRepository.delete(product);
  }

  // Delete a list of products from the database
  public void deleteProducts(List<Product> products) {
    productRepository.deleteAll(products);
  }
}
