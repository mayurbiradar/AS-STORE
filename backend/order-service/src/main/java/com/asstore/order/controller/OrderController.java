package com.asstore.order.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asstore.order.domain.Order;
import com.asstore.order.domain.OrderItem;
import com.asstore.order.repository.OrderRepository;
import com.asstore.order.domain.Address;
import com.asstore.order.service.OrderService;
import com.asstore.order.service.JwtService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
      
    private final OrderRepository repo;
    private final OrderService orderService;

    public OrderController(OrderRepository repo, OrderService orderService) {
        this.repo = repo;
        this.orderService = orderService;
    }

    @Autowired
    private JwtService jwtService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> list() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable UUID id) {
        Optional<Order> order = repo.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order create(@RequestBody Order order, @RequestHeader("Authorization") String authHeader) {
        // Extract JWT from header
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtService.getUserId(token);
        order.setUserId(UUID.fromString(userId));
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }
        order.setStatus("PLACED");
        // Assume address is included in order object as 'address'
        Address address = order.getAddress();
        address.setUserId(UUID.fromString(userId));
        return orderService.createOrder(order, address);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> update(@PathVariable UUID id, @RequestBody Order order) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        order.setId(id);
        return ResponseEntity.ok(repo.save(order));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getOrderCount() {
        return ResponseEntity.ok(repo.count());
    }
    
    @GetMapping("/revenue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Double> getTotalRevenue() {
        Double revenue = repo.getTotalRevenue();
        return ResponseEntity.ok(revenue != null ? revenue : 0.0);
    }
    
    @GetMapping("/my")
    public List<Order> getMyOrders(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtService.getUserId(token);
        return repo.findByUserId(java.util.UUID.fromString(userId));
    }
}
