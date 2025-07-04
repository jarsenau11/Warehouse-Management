package com.project1.warehouse_management.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.project1.warehouse_management.models.ProductType;


@DataJpaTest
@ActiveProfiles("test")
public class ProductTypeRepositoryTest {

    @Autowired
    ProductTypeRepository productTypeRepository;
    
    @Test
    public void testFindById() throws Exception {
        Optional<ProductType> existingProductTypeOptional = productTypeRepository.findById(1);
        ProductType existingProductType = existingProductTypeOptional.get();
        assertEquals(1L, existingProductType.getProductTypeId());
        assertEquals("Outdoors", existingProductType.getName());
    }
}
