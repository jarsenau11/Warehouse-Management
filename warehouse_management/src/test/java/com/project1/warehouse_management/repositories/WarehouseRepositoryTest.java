package com.project1.warehouse_management.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.project1.warehouse_management.models.Warehouse;


@DataJpaTest
@ActiveProfiles("test")
public class WarehouseRepositoryTest {

    @Autowired
    WarehouseRepository warehouseRepository;
    
    @Test
    public void testFindById() throws Exception {
        Optional<Warehouse> existingWarehouseOptional = warehouseRepository.findById(1);
        Warehouse existingWarehouse = existingWarehouseOptional.get();
        assertEquals(1L, existingWarehouse.getWarehouseId());
        assertEquals("AZ Warehouse", existingWarehouse.getName());
    }
}
