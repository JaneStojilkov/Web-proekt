package com.movies.moviesandreviews.repository;

import com.movies.moviesandreviews.models.Director;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DirectorRepository extends CrudRepository<Director, Long> {
   Director getById(Long id);
}
