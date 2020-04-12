package com.movies.moviesandreviews.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String Name;
    private Integer Age;
    @JsonIgnore
    @OneToMany(targetEntity = Movies.class, mappedBy = "director", fetch=FetchType.LAZY, cascade =CascadeType.ALL)

    private List<Movies> movies = new ArrayList<Movies>();

}
