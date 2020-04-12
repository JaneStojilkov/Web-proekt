package com.movies.moviesandreviews.services;

import com.movies.moviesandreviews.models.Actor;
import com.movies.moviesandreviews.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {

    @Autowired
    ActorRepository actorrepository;

    public List<Actor> findAll(){
        return (List<Actor>) actorrepository.findAll();
    }

    public Actor addActor(Actor a){
        return actorrepository.save(a);
    }

    public List<Actor> getAllbyName(String name){
        return actorrepository.getAllByName(name);
    }

    public void deleteActor(Actor a){
        actorrepository.delete(a);
    }

    public Actor find(Long id){return actorrepository.getById(id);}
}
