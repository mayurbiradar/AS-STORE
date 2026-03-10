package com.asstore.inventory.controller;

import com.asstore.inventory.domain.Inventory;
import com.asstore.inventory.repository.InventoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryRepository repo;

    public InventoryController(InventoryRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Inventory> list() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> get(@PathVariable UUID id) {
        Optional<Inventory> i = repo.findById(id);
        return i.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Inventory create(@RequestBody Inventory inv) { return repo.save(inv); }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> update(@PathVariable UUID id, @RequestBody Inventory inv) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        inv.setId(id);
        return ResponseEntity.ok(repo.save(inv));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
