package com.project1.warehouse_management.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.repositories.ItemRepository;

@SpringBootTest
public class ItemServiceTest {

    @MockitoBean
    ItemRepository itemRepository;

    @InjectMocks
    private ItemService itemService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllItems() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));

        when(itemRepository.findAll()).thenReturn(mockItemList);

        List<Item> items = itemService.findAllItems();

        assertEquals(mockItemList, items);
    }

    @Test
    public void testFindItemsByWarehouseId() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));
        Optional<List<Item>> mockItemListOptional = Optional.of(mockItemList);

        when(itemRepository.findItemsByWarehouseId(anyLong())).thenReturn(mockItemListOptional);

        List<Item> itemList = itemService.findItemsByWarehouseId(1);

        assertEquals(mockItemList, itemList);
    }

    @Test
    public void testFindItemsByWarehouseIdNoResults() {
        Optional<List<Item>> mockEmptyItemListOptional = Optional.empty();

        when(itemRepository.findItemsByWarehouseId(anyLong())).thenReturn(mockEmptyItemListOptional);

        List<Item> itemList = itemService.findItemsByWarehouseId(1);

        assertEquals(null, itemList);
    }

    @Test
    public void testFindItemsByProductId() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));
        Optional<List<Item>> mockItemListOptional = Optional.of(mockItemList);

        when(itemRepository.findItemsByProductId(anyLong())).thenReturn(mockItemListOptional);

        List<Item> itemList = itemService.findItemsByProductId(1);

        assertEquals(mockItemList, itemList);
    }

    @Test
    public void testFindItemsByProductIdNoResults() {
        Optional<List<Item>> mockEmptyItemListOptional = Optional.empty();

        when(itemRepository.findItemsByProductId(anyLong())).thenReturn(mockEmptyItemListOptional);

        List<Item> itemList = itemService.findItemsByProductId(1);

        assertEquals(null, itemList);
    }

    @Test
    public void testFindItemsByProductTypeId() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));
        Optional<List<Item>> mockItemListOptional = Optional.of(mockItemList);

        when(itemRepository.findItemsByProductTypeId(anyLong())).thenReturn(mockItemListOptional);

        List<Item> itemList = itemService.findItemsByProductTypeId(1);

        assertEquals(mockItemList, itemList);
    }

    @Test
    public void testFindItemsByProductTypeIdNoResults() {
        Optional<List<Item>> mockEmptyItemListOptional = Optional.empty();

        when(itemRepository.findItemsByProductTypeId(anyLong())).thenReturn(mockEmptyItemListOptional);

        List<Item> itemList = itemService.findItemsByProductTypeId(1);

        assertEquals(null, itemList);
    }

    @Test
    public void testFindByItemId() {
        Item mockItem = new Item(1, new Product(), new Warehouse());
        Optional<Item> mockItemOptional = Optional.of(mockItem);

        when(itemRepository.findById(anyLong())).thenReturn(mockItemOptional);

        Item item = itemService.findById(1);

        assertEquals(mockItem, item);
    }

    @Test
    public void testFindByItemIdNoResults() {
        Optional<Item> mockEmptyItemOptional = Optional.empty();

        when(itemRepository.findById(anyLong())).thenReturn(mockEmptyItemOptional);

        Item item = itemService.findById(1);

        assertEquals(null, item);
    }

    @Test
    public void testCreateItem() {
        Item mockItem = new Item(1, new Product(), new Warehouse());

        when(itemRepository.save(any())).thenReturn(mockItem);

        Item item = itemService.createItem(mockItem);

        assertEquals(mockItem, item);
    }

    @Test
    public void testCreateItems() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));

        when(itemRepository.saveAll(any())).thenReturn(mockItemList);

        List<Item> itemList = itemService.createItems(mockItemList);

        assertEquals(mockItemList, itemList);
    }

    @Test
    public void testUpdateItem() {
        Item mockItem = new Item(1, new Product(), new Warehouse());

        when(itemRepository.save(any())).thenReturn(mockItem);

        Item item = itemService.updateItem(mockItem);

        assertEquals(mockItem, item);
    }

    @Test
    public void testDeleteItem() {
        Item mockItem = new Item(1, new Product(), new Warehouse());

        itemService.deleteItem(mockItem);

        verify(itemRepository, times(1)).delete(mockItem);
    }

    @Test
    public void testDeleteItems() {
        List<Item> mockItemList = new ArrayList<Item>();
        mockItemList.add(new Item(1, new Product(), new Warehouse()));
        mockItemList.add(new Item(2, new Product(), new Warehouse()));

        itemService.deleteItems(mockItemList);

        verify(itemRepository, times(1)).deleteAll(mockItemList);
    }
    
}
