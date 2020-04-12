package com.movies.moviesandreviews.controller;

import com.movies.moviesandreviews.models.Director;
import com.movies.moviesandreviews.models.Movies;
import com.movies.moviesandreviews.services.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/directors")
@CrossOrigin(origins = "http://localhost:3000")
public class DirectorController {
    @Autowired
    private final DirectorService directorservice;

    public DirectorController(DirectorService directorservice) {
        this.directorservice = directorservice;
    }

    @PostMapping("")
    public ResponseEntity<?> addDirector(@RequestBody Director d){
        Director m = directorservice.addDirector(d);
        return new ResponseEntity<Director>(m, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Director> getAll(){
        return directorservice.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id){
        directorservice.deleteDirector(directorservice.find(id));
    }

    @GetMapping("/{id}")
    public Director getDirector(@PathVariable Long id){
        return directorservice.find(id);
    }

    @PutMapping("/{id}")
    public Director updateDirector(@RequestBody Director newDirector, @PathVariable Long id) {
        Director director = directorservice.find(id);
        director.setName(newDirector.getName());
        director.setAge(newDirector.getAge());
        return directorservice.addDirector(director);
        }
    }

