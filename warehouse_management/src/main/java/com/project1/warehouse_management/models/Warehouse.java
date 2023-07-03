package com.project1.warehouse_management.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.GenerationType;


@Entity
@Table(name = "warehouse")
public class Warehouse {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long warehouseId;

    @Column(name = "name")
    private String name;

    @Column(name = "capacity")
    private int capacity;
    
    @Column(name = "street")
    private String street;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "state")
    private String state;
    
    @Column(name = "zip")
    private int zip;

    @JsonBackReference
    @OneToMany(targetEntity = Item.class, mappedBy = "warehouse")
    private Set<Item> items;

    public Warehouse() {}

    public Warehouse(String name, int capacity, String street, String city, String state, int zip, Set<Item> items) {
        this.name = name;
        this.capacity = capacity;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.items = items;
    }

    public Warehouse(long warehouseId, String name, int capacity, String street, String city, String state, int zip,
            Set<Item> items) {
        this.warehouseId = warehouseId;
        this.name = name;
        this.capacity = capacity;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.items = items;
    }

    public long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
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
        result = prime * result + (int) (warehouseId ^ (warehouseId >>> 32));
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + capacity;
        result = prime * result + ((street == null) ? 0 : street.hashCode());
        result = prime * result + ((city == null) ? 0 : city.hashCode());
        result = prime * result + ((state == null) ? 0 : state.hashCode());
        result = prime * result + zip;
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
        Warehouse other = (Warehouse) obj;
        if (warehouseId != other.warehouseId)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (capacity != other.capacity)
            return false;
        if (street == null) {
            if (other.street != null)
                return false;
        } else if (!street.equals(other.street))
            return false;
        if (city == null) {
            if (other.city != null)
                return false;
        } else if (!city.equals(other.city))
            return false;
        if (state == null) {
            if (other.state != null)
                return false;
        } else if (!state.equals(other.state))
            return false;
        if (zip != other.zip)
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
        return "Warehouse [warehouseId=" + warehouseId + ", name=" + name + ", capacity=" + capacity + ", street="
                + street + ", city=" + city + ", state=" + state + ", zip=" + zip + ", items=" + items + "]";
    }

    
}

