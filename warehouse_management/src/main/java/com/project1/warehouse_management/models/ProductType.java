package com.project1.warehouse_management.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "PRODUCT_TYPE")
public class ProductType {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productTypeId;

    @Column(name = "value")
    private String value;

    @JsonBackReference
    @OneToMany(targetEntity = Product.class, mappedBy = "productType")
    private Set<Product> products;
    

    public ProductType() {}


    public ProductType(String value, Set<Product> products) {
        this.value = value;
        this.products = products;
    }


    public ProductType(long productTypeId, String value, Set<Product> products) {
        this.productTypeId = productTypeId;
        this.value = value;
        this.products = products;
    }


    public long getProductTypeId() {
        return productTypeId;
    }


    public void setProductTypeId(long productTypeId) {
        this.productTypeId = productTypeId;
    }


    public String getValue() {
        return value;
    }


    public void setValue(String value) {
        this.value = value;
    }


    public Set<Product> getProducts() {
        return products;
    }


    public void setProducts(Set<Product> products) {
        this.products = products;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (productTypeId ^ (productTypeId >>> 32));
        result = prime * result + ((value == null) ? 0 : value.hashCode());
        result = prime * result + ((products == null) ? 0 : products.hashCode());
        return result;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProductType other = (ProductType) obj;
        if (productTypeId != other.productTypeId)
            return false;
        if (value == null) {
            if (other.value != null)
                return false;
        } else if (!value.equals(other.value))
            return false;
        if (products == null) {
            if (other.products != null)
                return false;
        } else if (!products.equals(other.products))
            return false;
        return true;
    }


    @Override
    public String toString() {
        return "ProductType [productTypeId=" + productTypeId + ", value=" + value + ", products=" + products + "]";
    }


    


}
