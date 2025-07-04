package com.project1.warehouse_management.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.services.ItemService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ItemController.class)
public class ItemControllerTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockitoBean private ItemService itemService;

  @Test
  public void testFindAllItems() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    
    when(itemService.findAllItems()).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindAllItemsNoResults() throws Exception {
    List<Item> mockItemList = null;
    
    when(itemService.findAllItems()).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindItemsByWarehouseId() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    when(itemService.findItemsByWarehouseId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/warehouse/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindItemsByWarehouseIdNoResults() throws Exception {
    List<Item> mockItemList = null;
    when(itemService.findItemsByWarehouseId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/warehouse/1"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindItemsByProductId() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    when(itemService.findItemsByProductId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/product/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindItemsByProductIdNoResults() throws Exception {
    List<Item> mockItemList = null;
    when(itemService.findItemsByProductId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/product/1"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindItemsByProductTypeId() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    when(itemService.findItemsByProductTypeId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/productType/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isArray())
        .andExpect(status().isOk());
  }

  @Test
  public void testFindItemsByProductTypeIdNoResults() throws Exception {
    List<Item> mockItemList = null;
    when(itemService.findItemsByProductTypeId(1)).thenReturn(mockItemList);

    mockMvc
        .perform(get("/items/productType/1"))
        .andExpect(status().isNoContent());
  }

  @Test
  public void testFindByItemId() throws Exception {
    Item mockItem = new Item(1, new Product(), new Warehouse());
    when(itemService.findById(1)).thenReturn(mockItem);

    mockMvc
        .perform(get("/items/item/1"))
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$").isNotEmpty())
        .andExpect(status().isOk());
  }

  @Test
  public void testCreateItem() throws Exception {
    Item mockItem = new Item(1, new Product(), new Warehouse());
    String jsonMockItem = objectMapper.writeValueAsString(mockItem);
    when(itemService.createItem(any())).thenReturn(mockItem);

    mockMvc
        .perform(
            post("/items/newItem").contentType(MediaType.APPLICATION_JSON).content(jsonMockItem))
        .andExpect(status().isCreated());
  }

  @Test
  public void testCreateItems() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    mockItemList.add(new Item(1, new Product(), new Warehouse()));
    mockItemList.add(new Item(2, new Product(), new Warehouse()));

    String jsonMockItemList = objectMapper.writeValueAsString(mockItemList);
    when(itemService.createItems(any())).thenReturn(mockItemList);

    mockMvc
        .perform(
            post("/items/newItems")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockItemList))
        .andExpect(status().isCreated());
  }

  @Test
  public void testUpdateItem() throws Exception {
    Item mockItem = new Item(1, new Product(), new Warehouse());
    String jsonMockItem = objectMapper.writeValueAsString(mockItem);
    when(itemService.updateItem(any())).thenReturn(mockItem);

    mockMvc
        .perform(
            put("/items/item/updateItem")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockItem))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeleteItem() throws Exception {
    Item mockItem = new Item(1, new Product(), new Warehouse());
    String jsonMockItem = objectMapper.writeValueAsString(mockItem);
    when(itemService.findById(1)).thenReturn(mockItem);

    mockMvc
        .perform(
            delete("/items/item/delete/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockItem))
        .andExpect(status().isNoContent());

    verify(itemService).findById(1);
    verify(itemService).deleteItem(mockItem);
  }

  @Test
  public void testDeleteItems() throws Exception {
    List<Item> mockItemList = new ArrayList<Item>();
    mockItemList.add(new Item(1, new Product(), new Warehouse()));
    mockItemList.add(new Item(2, new Product(), new Warehouse()));

    String jsonMockItemList = objectMapper.writeValueAsString(mockItemList);

    mockMvc
        .perform(
            delete("/items/delete/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMockItemList))
        .andExpect(status().isNoContent());

    verify(itemService).deleteItems(mockItemList);
  }
}
