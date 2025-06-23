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

import com.project1.warehouse_management.models.Product;
import com.project1.warehouse_management.repositories.ProductRepository;

@SpringBootTest
public class ProductServiceTest {

    @MockitoBean
    ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllProducts() {
        List<Product> mockProductList = new ArrayList<Product>();
        mockProductList.add(new Product());
        mockProductList.add(new Product());

        when(productRepository.findAll()).thenReturn(mockProductList);

        List<Product> products = productService.findAllProducts();

        assertEquals(mockProductList, products);
    }

    @Test
    public void testFindByProductId() {
        Product mockProduct = new Product();
        Optional<Product> mockProductOptional = Optional.of(mockProduct);

        when(productRepository.findById(anyLong())).thenReturn(mockProductOptional);

        Product product = productService.findProductById(1);

        assertEquals(mockProduct, product);
    }

    @Test
    public void testFindByProductIdNoResults() {
        Optional<Product> mockEmptyProductOptional = Optional.empty();

        when(productRepository.findById(anyLong())).thenReturn(mockEmptyProductOptional);

        Product product = productService.findProductById(1);

        assertEquals(null, product);
    }

    @Test
    public void testCreateProduct() {
        Product mockProduct = new Product();

        when(productRepository.save(any())).thenReturn(mockProduct);

        Product product = productService.createProduct(mockProduct);

        assertEquals(mockProduct, product);
    }

    @Test
    public void testUpdateProduct() {
        Product mockProduct = new Product();

        when(productRepository.save(any())).thenReturn(mockProduct);

        Product product = productService.updateProduct(mockProduct);

        assertEquals(mockProduct, product);
    }

    @Test
    public void testDeleteProduct() {
        Product mockProduct = new Product();

        productService.deleteProduct(mockProduct);

        verify(productRepository, times(1)).delete(mockProduct);
    }

    @Test
    public void testDeleteProducts() {
        List<Product> mockProductList = new ArrayList<Product>();
        mockProductList.add(new Product());
        mockProductList.add(new Product());

        productService.deleteProducts(mockProductList);

        verify(productRepository, times(1)).deleteAll(mockProductList);
    }
    
}
