package com.project1.warehouse_management.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.repositories.ItemRepository;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> findItemsByWarehouseId(long warehouseId) {
        Optional<List<Item>> items = itemRepository.findItemsByWarehouseId(warehouseId);

        if(items.isPresent()) {
            return items.get();
        }
        return null;
    }

    public List<Item> findItemsByProductId(long productId) {
        Optional<List<Item>> items = itemRepository.findItemsByProductId(productId);

        if(items.isPresent()) {
            return items.get();
        }
        return null;
    }

    public List<Item> findItemsByProductTypeId(long productTypeId) {
        Optional<List<Item>> items = itemRepository.findItemsByProductTypeId(productTypeId);

        if(items.isPresent()) {
            return items.get();
        }
        return null;
    }

    public Item findById(long itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        if(item.isPresent()) {
            return item.get();
        }
        return null;
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item updateItem(Item item) {
        return itemRepository.save(item);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
}
