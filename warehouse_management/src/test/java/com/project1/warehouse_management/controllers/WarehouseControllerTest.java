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
import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.services.WarehouseService;

@WebMvcTest(WarehouseController.class)
public class WarehouseControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private WarehouseService warehouseService;

  @Test
  public void testFindAllWarehouses() throws Exception {
    List<Warehouse> mockWarehouseList = new ArrayList<Warehouse>();
    when(warehouseService.findAllWarehouses()).thenReturn(mockWarehouseList);

    mockMvc
        .perform(get("/warehouses"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindAllWarehousesNoResults() throws Exception {
    List<Warehouse> mockWarehouseList = null;
    when(warehouseService.findAllWarehouses()).thenReturn(mockWarehouseList);

    mockMvc
        .perform(get("/warehouses"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindWarehouseById() throws Exception {
    Warehouse mockWarehouse = new Warehouse(1, "testName", 300, "testStreet", "testCity", "testState", 12345, new ArrayList<Item>());
    when(warehouseService.findWarehouseById(1)).thenReturn(mockWarehouse);

    mockMvc
        .perform(get("/warehouses/warehouse/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty())
        .andExpect(status().isOk());
  }

  @Test
  public void testCreateWarehouse() throws Exception {
    Warehouse mockWarehouse = new Warehouse(1, "testName", 300, "testStreet", "testCity", "testState", 12345, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockWarehouse);
    when(warehouseService.createWarehouse(any())).thenReturn(mockWarehouse);

    mockMvc
        .perform(
            post("/warehouses/newWarehouse")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isCreated());
  }

  @Test
  public void testUpdateWarehouse() throws Exception {
    Warehouse mockWarehouse = new Warehouse(1, "testName", 300, "testStreet", "testCity", "testState", 12345, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockWarehouse);
    when(warehouseService.updateWarehouse(any())).thenReturn(mockWarehouse);

    mockMvc
        .perform(
            put("/warehouses/warehouse/updateWarehouse")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeleteWarehouse() throws Exception {
    Warehouse mockWarehouse = new Warehouse(1, "testName", 300, "testStreet", "testCity", "testState", 12345, new ArrayList<Item>());
    String jsonMockProduct = objectMapper.writeValueAsString(mockWarehouse);
    when(warehouseService.findWarehouseById(1)).thenReturn(mockWarehouse);

    mockMvc
        .perform(
            delete("/warehouses/warehouse/delete/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockProduct))
        .andExpect(status().isNoContent());

    verify(warehouseService).findWarehouseById(1);
    verify(warehouseService).deleteWarehouse(mockWarehouse);
  }

}
