package com.project1.warehouse_management.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.services.ProductService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {
  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private ProductService productService;

  @Test
  public void testFindAllProducts() throws Exception {
    List<Product> mockProductList = new ArrayList<Product>();
    when(productService.findAllProducts()).thenReturn(mockProductList);

    mockMvc
        .perform(get("/products"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindAllProductsNoResults() throws Exception {
    List<Product> mockProductList = null;
    when(productService.findAllProducts()).thenReturn(mockProductList);

    mockMvc
        .perform(get("/products"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindByProductId() throws Exception {
    Product mockProduct = new Product(1, "testName", new ProductType(), "testDesc", 10.00, 3, new ArrayList<Item>());
    when(productService.findProductById(1)).thenReturn(mockProduct);

    mockMvc
        .perform(get("/products/product/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty())
        .andExpect(status().isOk());
  }

  @Test
  public void testCreateProduct() throws Exception {
    Product mockProduct = new Product(1, "testName", new ProductType(), "testDesc", 10.00, 3, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProduct);
    when(productService.createProduct(any())).thenReturn(mockProduct);

    mockMvc
        .perform(
            post("/products/newProduct")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isCreated());
  }

  @Test
  public void testUpdateProduct() throws Exception {
    Product mockProduct = new Product(1, "testName", new ProductType(), "testDesc", 10.00, 3, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProduct);
    when(productService.updateProduct(any())).thenReturn(mockProduct);

    mockMvc
        .perform(
            put("/products/product/updateProduct")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeleteProduct() throws Exception {
    Product mockProduct = new Product(1, "testName", new ProductType(), "testDesc", 10.00, 3, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProduct);
    when(productService.findProductById(1)).thenReturn(mockProduct);

    mockMvc
        .perform(
            delete("/products/product/delete/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isNoContent());

    verify(productService).findProductById(1);
    verify(productService).deleteProduct(mockProduct);
  }

  @Test
  public void testDeleteProducts() throws Exception {
    List<Product> mockProductList = new ArrayList<Product>();
    mockProductList.add(new Product());
    mockProductList.add(new Product());

    String jsonMockProductList = objectMapper.writeValueAsString(mockProductList);

    mockMvc
        .perform(
            delete("/products/delete/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProductList))
        .andExpect(status().isNoContent());

    verify(productService).deleteProducts(mockProductList);
  }
}
