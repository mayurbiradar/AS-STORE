   
package com.asstore.product.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.asstore.product.domain.Product;
import com.asstore.product.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Product> list() { return repo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Product> get(@PathVariable UUID id) {
        Optional<Product> p = repo.findById(id);
        return p.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/create-with-image")
    public ResponseEntity<Product> createWithImage(
        @RequestParam("name") String name,
        @RequestParam("sku") String sku,
        @RequestParam("description") String description,
        @RequestParam("price") Long price,
        @RequestParam(value = "rating", required = false) Double rating,
        @RequestParam(value = "stock", required = false) Integer stock,
        @RequestParam(value = "active", required = false) Boolean active,
        @RequestParam("file") MultipartFile file
    ) throws IOException {
        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path imagePath = Paths.get("src/main/resources/static/images", filename);
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, file.getBytes());
        String imageUrl = "/images/" + filename;

        Product p = new Product();
        p.setName(name);
        p.setSku(sku);
        p.setDescription(description);
        p.setPrice(price);
        p.setImage(imageUrl);
        if (rating != null) p.setRating(rating);
        if (stock != null) p.setStock(stock);
        if (active != null) p.setActive(active);
        p.setCreatedAt(java.time.Instant.now());
        p.setUpdatedAt(java.time.Instant.now());
        Product saved = repo.save(p);
        return ResponseEntity.ok(saved);
    }
}
