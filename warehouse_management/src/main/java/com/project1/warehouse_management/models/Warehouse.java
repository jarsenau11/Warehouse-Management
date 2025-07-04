/*
 * Warehouse Model
 *      - entity attributes: warehouseId (long), name (string), capacity (int), street (string), city (string), state (string), zip (int) items (set of Item objects)
 *      - one to many relationship with Item entity
 */

package com.project1.warehouse_management.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "WAREHOUSE")
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
  private List<Item> items;
}
