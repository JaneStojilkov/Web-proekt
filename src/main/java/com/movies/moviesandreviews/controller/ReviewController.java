package com.movies.moviesandreviews.controller;

import com.movies.moviesandreviews.models.Review;
import com.movies.moviesandreviews.services.MoviesService;
import com.movies.moviesandreviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private final ReviewService reviewservice;
    private final MoviesService movieservice;

    public ReviewController(ReviewService reviewservice, MoviesService movieservice) {
        this.reviewservice = reviewservice;
        this.movieservice = movieservice;
    }


    @PostMapping("/{id}")
    public ResponseEntity<?> addReview(@RequestBody Review review,@PathVariable Long id){
        review.setMovie(movieservice.getMovie(id));
        Review m = reviewservice.addReview(review);
        return new ResponseEntity<Review>(m, HttpStatus.CREATED);
    }
   @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id){
        reviewservice.deleteReview(reviewservice.getById(id));
   }

    @GetMapping("")
    public Iterable<Review> getAll(){
        return reviewservice.findAll();
    }
}
