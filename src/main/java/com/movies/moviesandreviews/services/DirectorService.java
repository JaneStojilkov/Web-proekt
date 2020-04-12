package com.movies.moviesandreviews.services;

import com.movies.moviesandreviews.models.Director;
import com.movies.moviesandreviews.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectorService {
    @Autowired
    DirectorRepository repo;

    public List<Director> findAll(){
        return (List<Director>)repo.findAll();
    }

    public Director addDirector(Director d){
        return repo.save(d);
    }

    public Director find(Long id){
        return repo.getById(id);
    }

    public void deleteDirector(Director d){ repo.delete(d);}
}
