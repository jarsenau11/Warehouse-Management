/*
 * Product Model
 *      - entity attributes: productId (long), name (string), productType (object), description (string), price (double), size (int), items (set of Items)
 *      - one to many relationship with Item entity
 */

package com.project1.warehouse_management.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCT")
public class Product {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long productId;

  @Column(name = "name")
  private String name;

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
  private List<Item> items;
}
