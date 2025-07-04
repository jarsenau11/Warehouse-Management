/*
 * Item Model
 *      - entity attributes: warehouseId (long), warehouse (Warehouse object), product (Product object)
 *      - many to one relationship with product; many to one relationship with warehouse
 */

package com.project1.warehouse_management.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ITEM")
public class Item {

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long itemId;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

  @ManyToOne
  @JoinColumn(name = "warehouse_id")
  private Warehouse warehouse;
}
