package com.movies.moviesandreviews.controller;

import com.movies.moviesandreviews.models.Director;
import com.movies.moviesandreviews.models.Movies;
import com.movies.moviesandreviews.repository.MoviesRepository;
import com.movies.moviesandreviews.services.MoviesService;
import lombok.var;
import org.hibernate.type.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.swing.text.html.parser.Entity;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MoviesController {

    @Autowired
    private final MoviesService service;

    public MoviesController(MoviesService service) {
        this.service = service;
    }


        @PostMapping("")
        public ResponseEntity<?> addMovie(@RequestBody Movies movie){
          Movies m = service.addMovie(movie);
          return new ResponseEntity<Movies>(m, HttpStatus.CREATED);

        }

        @GetMapping("")
        public Iterable<Movies> getAll(){
        return service.findAll();
        }

        @DeleteMapping("/{id}")
        public void deleteMovie(@PathVariable Long id){
           service.delete(service.getMovie(id));
        }

        @GetMapping("/{id}")
        public Movies getMovie(@PathVariable Long id){
           return service.getMovie(id);
        }

        @GetMapping("/name/{name}")
        public Movies getMovieName(@PathVariable String name){
            return service.getByName(name);
        }

    @PutMapping("/{id}")
    public Movies updateDirector(@RequestBody Movies newMovie, @PathVariable Long id) {
        Movies movie = service.getMovie(id);
        movie.setName(newMovie.getName());
        movie.setRating(newMovie.getRating());
        movie.setYear(newMovie.getYear());
        movie.setDirector(newMovie.getDirector());
        movie.setActors(newMovie.getActors());
        movie.setReviews(newMovie.getReviews());
        return service.addMovie(movie);
    }

    }


