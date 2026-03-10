package com.asstore.inventory.domain;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "reservations")
@Data
public class Reservation {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID inventoryId;

    private UUID orderId;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String status = "RESERVED"; // RESERVED, RELEASED, CONFIRMED

    private Instant createdAt = Instant.now();

    private Instant expiresAt;
}
