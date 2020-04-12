package com.movies.moviesandreviews.services;

import com.movies.moviesandreviews.models.Movies;
import com.movies.moviesandreviews.models.Review;
import com.movies.moviesandreviews.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepo;

    public List<Review> getByMovies(Movies movie){
        return (List<Review>) reviewRepo.getByMovie(movie);
    }

    public Review addReview(Review review){
        return reviewRepo.save(review);
    }

    public void deleteReview(Review review){
            reviewRepo.delete(review);
    }

    public List<Review> findAll(){return (List<Review>)reviewRepo.findAll();}

    public Review getById(Long id){return reviewRepo.getById(id);}
}
