/*
 * Product Type Model
 *      - entity attributes: productTypeId (long), name (string), products (set of Product objects)
 *      - one to many relationship with the Product entity
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
@Table(name = "PRODUCT_TYPE")
public class ProductType {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long productTypeId;

  @Column(name = "name")
  private String name;

  @JsonBackReference
  @OneToMany(targetEntity = Product.class, mappedBy = "productType")
  private List<Product> products;
}
