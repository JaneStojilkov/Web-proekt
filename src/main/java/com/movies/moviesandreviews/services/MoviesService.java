package com.movies.moviesandreviews.services;

import com.movies.moviesandreviews.models.Director;
import com.movies.moviesandreviews.models.Movies;
import com.movies.moviesandreviews.repository.DirectorRepository;
import com.movies.moviesandreviews.repository.MoviesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviesService {
    @Autowired
    MoviesRepository repository;


    public List<Movies> findAll(){
        return (List<Movies>) repository.findAll();
    }

    public Movies addMovie(Movies movie){
        return repository.save(movie);
    }

    public MoviesRepository getRepository() {
        return repository;
    }

    public void delete(Movies m){
        repository.delete(m);
    }

    public Movies getMovie(Long id){
        return repository.getById(id);
    }

    public Movies getByName(String Name){ return repository.getByName(Name); }
}
