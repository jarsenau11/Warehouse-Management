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

import com.project1.warehouse_management.models.ProductType;
import com.project1.warehouse_management.repositories.ProductTypeRepository;

@SpringBootTest
public class ProductTypeServiceTest {

    @MockitoBean
    ProductTypeRepository productTypeRepository;

    @InjectMocks
    private ProductTypeService productTypeService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllProductTypes() {
        List<ProductType> mockProductTypeList = new ArrayList<ProductType>();
        mockProductTypeList.add(new ProductType());
        mockProductTypeList.add(new ProductType());

        when(productTypeRepository.findAll()).thenReturn(mockProductTypeList);

        List<ProductType> productTypes = productTypeService.findAllProductTypes();

        assertEquals(mockProductTypeList, productTypes);
    }

    @Test
    public void testFindByProductTypeId() {
        ProductType mockProductType = new ProductType();
        Optional<ProductType> mockProductTypeOptional = Optional.of(mockProductType);

        when(productTypeRepository.findById(anyLong())).thenReturn(mockProductTypeOptional);

        ProductType productType = productTypeService.findProductTypeById(1);

        assertEquals(mockProductType, productType);
    }

    @Test
    public void testFindByProductTypeIdNoResults() {
        Optional<ProductType> mockEmptyProductTypeOptional = Optional.empty();

        when(productTypeRepository.findById(anyLong())).thenReturn(mockEmptyProductTypeOptional);

        ProductType productType = productTypeService.findProductTypeById(1);

        assertEquals(null, productType);
    }

    @Test
    public void testCreateProductType() {
        ProductType mockProductType = new ProductType();

        when(productTypeRepository.save(any())).thenReturn(mockProductType);

        ProductType productType = productTypeService.createProductType(mockProductType);

        assertEquals(mockProductType, productType);
    }

    @Test
    public void testUpdateProductType() {
        ProductType mockProductType = new ProductType();

        when(productTypeRepository.save(any())).thenReturn(mockProductType);

        ProductType productType = productTypeService.updateProductType(mockProductType);

        assertEquals(mockProductType, productType);
    }

    @Test
    public void testDeleteProductType() {
        ProductType mockProductType = new ProductType();

        productTypeService.deleteProductType(mockProductType);

        verify(productTypeRepository, times(1)).delete(mockProductType);
    }
    
}
