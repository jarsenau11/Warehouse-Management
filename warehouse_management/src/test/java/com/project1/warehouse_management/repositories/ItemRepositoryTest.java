package com.project1.warehouse_management.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.project1.warehouse_management.models.Item;


@DataJpaTest
@ActiveProfiles("test")
public class ItemRepositoryTest {

    @Autowired
    ItemRepository itemRepository;
    
    @Test
    public void testFindById() throws Exception {
        Optional<Item> existingItemOptional = itemRepository.findById(3);
        Item existingItem = existingItemOptional.get();
        assertEquals(3L, existingItem.getItemId());
        assertEquals("TrekMaster Sleeping Bag", existingItem.getProduct().getName());
    }

    @Test
    public void testFindItemsByWarehouseId() throws Exception {
        Optional<List<Item>> itemsOptional = itemRepository.findItemsByWarehouseId(1);
        List<Item> items = itemsOptional.get();
        assertEquals(20, items.size());
    }

    @Test
    public void testFindItemsByProductId() throws Exception {
        Optional<List<Item>> itemsOptional = itemRepository.findItemsByProductId(20);
        List<Item> items = itemsOptional.get();
        assertEquals(2, items.size());
    }

    @Test
    public void testFindItemsByProductTypeId() throws Exception {
        Optional<List<Item>> itemsOptional = itemRepository.findItemsByProductTypeId(1);
        List<Item> items = itemsOptional.get();
        assertEquals(20, items.size());
    }
}
