package com.asstore.order.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.asstore.order.domain.Order;

public interface OrderRepository extends JpaRepository<Order, UUID> {

	@Query("SELECT SUM(o.totalAmount) FROM Order o")
	Double getTotalRevenue();
}
