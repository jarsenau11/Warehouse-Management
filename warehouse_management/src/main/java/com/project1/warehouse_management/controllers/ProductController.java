/*
 * ProductController - handles incoming HTTP requests for our products
 */

package com.project1.warehouse_management.controllers;

import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.services.ProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

  @Autowired ProductService productService;

  // GET all products in the database
  @GetMapping
  public ResponseEntity<List<Product>> findAllProducts() {
    List<Product> products = productService.findAllProducts();

    if (products == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
  }

  // GET a product by id
  @GetMapping("product/{productId}")
  public ResponseEntity<Product> findProductById(@PathVariable long productId) {
    Product product = productService.findProductById(productId);
    return new ResponseEntity<Product>(product, HttpStatus.OK);
  }

  // POST a new product
  @PostMapping("/newProduct")
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product newProduct = productService.createProduct(product);
    return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
  }

  // PUT (update) a product
  @PutMapping("/product/updateProduct")
  public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
    Product updatedProduct = productService.updateProduct(product);
    return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
  }

  // DELETE a product by id
  @DeleteMapping("/product/delete/{productId}")
  public ResponseEntity<Product> deleteProduct(@PathVariable long productId) {
    Product product = productService.findProductById(productId);
    productService.deleteProduct(product);
    return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
  }

  // DELETE a list of products
  @DeleteMapping("/delete/products")
  public ResponseEntity<Product> deleteProducts(@RequestBody List<Product> products) {
    productService.deleteProducts(products);
    return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
  }
}
