package com.movies.moviesandreviews.controller;

import com.movies.moviesandreviews.models.Actor;
import com.movies.moviesandreviews.models.Director;
import com.movies.moviesandreviews.services.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/actors")
@CrossOrigin(origins = "http://localhost:3000")
public class ActorController {

    @Autowired
    private final ActorService actorservice;

    public ActorController(ActorService actorservice) {
        this.actorservice = actorservice;
    }

    @PostMapping("")
    public ResponseEntity<?> addActor(@RequestBody Actor a){
        Actor m = actorservice.addActor(a);
        return new ResponseEntity<Actor>(m, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Actor> getAllActors(){
        return actorservice.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteActor(@PathVariable Long id){
        actorservice.deleteActor(actorservice.find(id));
    }

    @GetMapping("/{id}")
    public Actor getActor(@PathVariable Long id){
        return actorservice.find(id);
    }

    @PutMapping("/{id}")
    public Actor updateActor(@RequestBody Actor newActor, @PathVariable Long id) {
        Actor actor = actorservice.find(id);
        actor.setName(newActor.getName());
        actor.setAge(newActor.getAge());
        return actorservice.addActor(actor);
    }
}
