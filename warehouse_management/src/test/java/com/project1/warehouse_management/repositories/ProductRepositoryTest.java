package com.project1.warehouse_management.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.project1.warehouse_management.models.Product;


@DataJpaTest
@ActiveProfiles("test")
public class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;
    
    @Test
    public void testFindById() throws Exception {
        Optional<Product> existingProductOptional = productRepository.findById(5);
        Product existingProduct = existingProductOptional.get();
        assertEquals(5L, existingProduct.getProductId());
        assertEquals("ProTrek Trekking Poles", existingProduct.getName());
    }
}
