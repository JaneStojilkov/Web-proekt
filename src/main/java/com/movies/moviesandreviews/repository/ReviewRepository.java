package com.movies.moviesandreviews.repository;
import com.movies.moviesandreviews.models.Movies;
import com.movies.moviesandreviews.models.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {
    List<Review> getByMovie(Movies movie);
    Review getById(Long id);
}
