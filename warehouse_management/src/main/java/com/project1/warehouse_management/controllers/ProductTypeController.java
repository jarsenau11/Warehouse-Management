/*
 * ProductTypeController - handles incoming HTTP requests for our product types
 */

package com.project1.warehouse_management.controllers;

import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.services.ProductTypeService;
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
@RequestMapping("/productTypes")
public class ProductTypeController {

  @Autowired ProductTypeService productTypeService;

  @GetMapping
  public ResponseEntity<List<ProductType>> findAllProductTypes() {
    List<ProductType> productTypes = productTypeService.findAllProductTypes();

    if (productTypes == null) {
      return ResponseEntity.noContent().build();
    }

    return new ResponseEntity<List<ProductType>>(productTypes, HttpStatus.OK);
  }

  // GET product type by id
  @GetMapping("productType/{productTypeId}")
  public ResponseEntity<ProductType> findProductTypeById(@PathVariable long productTypeId) {
    ProductType productType = productTypeService.findProductTypeById(productTypeId);
    return new ResponseEntity<ProductType>(productType, HttpStatus.OK);
  }

  // POST new product type
  @PostMapping("/newProductType")
  public ResponseEntity<ProductType> createProductType(@RequestBody ProductType productType) {
    ProductType newProductType = productTypeService.createProductType(productType);
    return new ResponseEntity<ProductType>(newProductType, HttpStatus.CREATED);
  }

  // PUT (update) a product type
  @PutMapping("/productType/updateProductType")
  public ResponseEntity<ProductType> updateProductType(@RequestBody ProductType productType) {
    ProductType updatedProductType = productTypeService.updateProductType(productType);
    return new ResponseEntity<ProductType>(updatedProductType, HttpStatus.OK);
  }

  // DELETE a product type by id
  @DeleteMapping("/productType/delete/{productTypeId}")
  public ResponseEntity<ProductType> deleteProductType(@PathVariable long productTypeId) {
    ProductType productType = productTypeService.findProductTypeById(productTypeId);
    productTypeService.deleteProductType(productType);
    return new ResponseEntity<ProductType>(HttpStatus.NO_CONTENT);
  }
}
