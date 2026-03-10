package com.asstore.inventory.domain;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "inventory")
@Data
public class Inventory {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID productId;

    private String warehouseId = "DEFAULT";

    @Column(nullable = false)
    private Integer availableQty = 0;

    @Column(nullable = false)
    private Integer reservedQty = 0;
}
