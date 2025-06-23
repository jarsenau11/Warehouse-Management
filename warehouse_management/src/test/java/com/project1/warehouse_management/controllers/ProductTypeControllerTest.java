package com.project1.warehouse_management.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.services.ProductTypeService;

@WebMvcTest(ProductTypeController.class)
public class ProductTypeControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private ProductTypeService productTypeService;

  @Test
  public void testFindAllProductTypes() throws Exception {
    List<ProductType> mockProductTypeList = new ArrayList<ProductType>();
    when(productTypeService.findAllProductTypes()).thenReturn(mockProductTypeList);

    mockMvc
        .perform(get("/productTypes"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindAllProductTypesNoResults() throws Exception {
    List<ProductType> mockProductTypeList = null;
    when(productTypeService.findAllProductTypes()).thenReturn(mockProductTypeList);

    mockMvc
        .perform(get("/productTypes"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindProductTypeById() throws Exception {
    ProductType mockProductType = new ProductType(1, "testName", new ArrayList<Product>());
    when(productTypeService.findProductTypeById(1)).thenReturn(mockProductType);

    mockMvc
        .perform(get("/productTypes/productType/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty())
        .andExpect(status().isOk());
  }

  @Test
  public void testCreateProductType() throws Exception {
    ProductType mockProductType = new ProductType(1, "testName", new ArrayList<Product>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProductType);
    when(productTypeService.createProductType(any())).thenReturn(mockProductType);

    mockMvc
        .perform(
            post("/productTypes/newProductType")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isCreated());
  }

  @Test
  public void testUpdateProductType() throws Exception {
    ProductType mockProductType = new ProductType(1, "testName", new ArrayList<Product>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProductType);
    when(productTypeService.updateProductType(any())).thenReturn(mockProductType);

    mockMvc
        .perform(
            put("/productTypes/productType/updateProductType")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeleteProductType() throws Exception {
    ProductType mockProductType = new ProductType(1, "testName", new ArrayList<Product>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockProductType);
    when(productTypeService.findProductTypeById(1)).thenReturn(mockProductType);

    mockMvc
        .perform(
            delete("/productTypes/productType/delete/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isNoContent());

    verify(productTypeService).findProductTypeById(1);
    verify(productTypeService).deleteProductType(mockProductType);
  }

}
