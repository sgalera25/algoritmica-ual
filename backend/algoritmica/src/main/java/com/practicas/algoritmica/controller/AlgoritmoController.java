package com.practicas.algoritmica.controller;

import com.practicas.algoritmica.model.Algoritmo;
import com.practicas.algoritmica.service.AlgoritmoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/algoritmos")
public class AlgoritmoController {

    private final AlgoritmoService service;

    public AlgoritmoController(AlgoritmoService service) {
        this.service = service;
    }

    // GET ALL
    @GetMapping
    public List<Algoritmo> getAll() {
        return service.getTodosLosAlgoritmos();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Algoritmo> getById(@PathVariable int id) {

        Algoritmo algoritmo = service.getPorId(id);

        if (algoritmo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(algoritmo);
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Algoritmo> crear(
            @RequestBody Algoritmo algoritmo
    ) {

        Algoritmo creado = service.crear(algoritmo);

        return ResponseEntity.ok(creado);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Algoritmo> actualizar(
            @PathVariable int id,
            @RequestBody Algoritmo algoritmo
    ) {

        Algoritmo actualizado =
                service.actualizar(id, algoritmo);

        if (actualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(actualizado);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {

        boolean eliminado = service.eliminar(id);

        if (!eliminado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}