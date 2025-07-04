/*
 * ItemService - handles requests from the ItemController
 */

package com.project1.warehouse_management.services;

import com.project1.warehouse_management.models.Item;
import com.project1.warehouse_management.repositories.ItemRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

  @Autowired ItemRepository itemRepository;

  // Retrieves all items
  public List<Item> findAllItems() {
    return itemRepository.findAll();
  }

  // Retrieves all items in a given warehouse based on warehouseId
  public List<Item> findItemsByWarehouseId(long warehouseId) {
    Optional<List<Item>> items = itemRepository.findItemsByWarehouseId(warehouseId);

    if (items.isPresent()) {
      return items.get();
    }
    return null;
  }

  // Retrieves all items associated with a given product based on the productId
  public List<Item> findItemsByProductId(long productId) {
    Optional<List<Item>> items = itemRepository.findItemsByProductId(productId);

    if (items.isPresent()) {
      return items.get();
    }
    return null;
  }

  // Retrieves all items associated with the given product type based on productTypeId
  public List<Item> findItemsByProductTypeId(long productTypeId) {
    Optional<List<Item>> items = itemRepository.findItemsByProductTypeId(productTypeId);

    if (items.isPresent()) {
      return items.get();
    }
    return null;
  }

  // Retrieves an item based on itemId
  public Item findById(long itemId) {
    Optional<Item> item = itemRepository.findById(itemId);
    if (item.isPresent()) {
      return item.get();
    }
    return null;
  }

  // Adds a new item to the database
  public Item createItem(Item item) {
    return itemRepository.save(item);
  }

  // Add a list of items to the database
  public List<Item> createItems(List<Item> items) {
    return itemRepository.saveAll(items);
  }

  // Updates an existing item in the database
  public Item updateItem(Item item) {
    return itemRepository.save(item);
  }

  // Delete an item from the database
  public void deleteItem(Item item) {
    itemRepository.delete(item);
  }

  // Delete a list of items from the database
  public void deleteItems(List<Item> items) {
    itemRepository.deleteAll(items);
  }
}
