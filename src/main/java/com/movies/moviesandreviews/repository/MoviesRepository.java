package com.movies.moviesandreviews.repository;

import com.movies.moviesandreviews.models.Movies;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoviesRepository extends CrudRepository<Movies, String> {
        Movies getById(Long id);
        Movies getByName(String Name);
}
