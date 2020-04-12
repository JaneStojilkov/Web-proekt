package com.movies.moviesandreviews.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Movies {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    @Range(min=1, max=5)
    Integer rating;
    @ManyToOne
    @JoinColumn(name = "director_id")
    Director director;
    @OneToMany(targetEntity = Review.class, mappedBy = "movie", fetch=FetchType.LAZY, cascade =CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
    Integer Year;
    @ManyToMany
    @JoinTable(
            name = "actor_movies",
            joinColumns = {@JoinColumn(name = "movies_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "actors_id", referencedColumnName = "id")})
    private List<Actor> actors = new ArrayList<>();
}
