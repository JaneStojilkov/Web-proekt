package com.movies.moviesandreviews.repository;

import com.movies.moviesandreviews.models.Actor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorRepository extends CrudRepository<Actor, Long> {
    List<Actor> getAllByName(String name);
    Actor getById(Long id);
}
