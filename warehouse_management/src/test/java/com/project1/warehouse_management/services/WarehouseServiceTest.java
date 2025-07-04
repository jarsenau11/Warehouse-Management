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

import com.project1.warehouse_management.models.Warehouse;
import com.project1.warehouse_management.repositories.WarehouseRepository;

@SpringBootTest
public class WarehouseServiceTest {

    @MockitoBean
    WarehouseRepository warehouseRepository;

    @InjectMocks
    private WarehouseService warehouseService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllWarehouses() {
        List<Warehouse> mockWarehouseList = new ArrayList<Warehouse>();
        mockWarehouseList.add(new Warehouse());
        mockWarehouseList.add(new Warehouse());

        when(warehouseRepository.findAll()).thenReturn(mockWarehouseList);

        List<Warehouse> warehouses = warehouseService.findAllWarehouses();

        assertEquals(mockWarehouseList, warehouses);
    }

    @Test
    public void testFindByWarehouseId() {
        Warehouse mockWarehouse = new Warehouse();
        Optional<Warehouse> mockWarehouseOptional = Optional.of(mockWarehouse);

        when(warehouseRepository.findById(anyLong())).thenReturn(mockWarehouseOptional);

        Warehouse warehouse = warehouseService.findWarehouseById(1);

        assertEquals(mockWarehouse, warehouse);
    }

    @Test
    public void testFindByWarehouseIdNoResults() {
        Optional<Warehouse> mockEmptyWarehouseOptional = Optional.empty();

        when(warehouseRepository.findById(anyLong())).thenReturn(mockEmptyWarehouseOptional);

        Warehouse warehouse = warehouseService.findWarehouseById(1);

        assertEquals(null, warehouse);
    }

    @Test
    public void testCreateWarehouse() {
        Warehouse mockWarehouse = new Warehouse();

        when(warehouseRepository.save(any())).thenReturn(mockWarehouse);

        Warehouse warehouse = warehouseService.createWarehouse(mockWarehouse);

        assertEquals(mockWarehouse, warehouse);
    }

    @Test
    public void testUpdateWarehouse() {
        Warehouse mockWarehouse = new Warehouse();

        when(warehouseRepository.save(any())).thenReturn(mockWarehouse);

        Warehouse warehouse = warehouseService.updateWarehouse(mockWarehouse);

        assertEquals(mockWarehouse, warehouse);
    }

    @Test
    public void testDeleteWarehouse() {
        Warehouse mockWarehouse = new Warehouse();

        warehouseService.deleteWarehouse(mockWarehouse);

        verify(warehouseRepository, times(1)).delete(mockWarehouse);
    }
    
}
