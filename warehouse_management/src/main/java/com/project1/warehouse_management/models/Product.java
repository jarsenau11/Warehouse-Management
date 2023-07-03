package com.project1.warehouse_management.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "product")
public class Product {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productId;

    @Column(name = "name")
    private String name;

    // @Column(name = "product_type_id")
    @ManyToOne
    @JoinColumn(name = "product_type_id")
    private ProductType productType;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;
    
    @Column
    @Min(1)
    @Max(5)
    private int size;

    @JsonBackReference
    @OneToMany(targetEntity = Item.class, mappedBy = "product")
    private Set<Item> items;

    public Product() {}

    public Product(String name, ProductType productType, String description, double price, @Min(1) @Max(5) int size,
            Set<Item> items) {
        this.name = name;
        this.productType = productType;
        this.description = description;
        this.price = price;
        this.size = size;
        this.items = items;
    }

    public Product(long productId, String name, ProductType productType, String description, double price,
            @Min(1) @Max(5) int size, Set<Item> items) {
        this.productId = productId;
        this.name = name;
        this.productType = productType;
        this.description = description;
        this.price = price;
        this.size = size;
        this.items = items;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (productId ^ (productId >>> 32));
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((productType == null) ? 0 : productType.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + size;
        result = prime * result + ((items == null) ? 0 : items.hashCode());
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
        Product other = (Product) obj;
        if (productId != other.productId)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (productType == null) {
            if (other.productType != null)
                return false;
        } else if (!productType.equals(other.productType))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        if (size != other.size)
            return false;
        if (items == null) {
            if (other.items != null)
                return false;
        } else if (!items.equals(other.items))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [productId=" + productId + ", name=" + name + ", productType=" + productType + ", description="
                + description + ", price=" + price + ", size=" + size + ", items=" + items + "]";
    }

    
    
}
