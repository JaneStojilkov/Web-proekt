import React from "react";
import {Jumbotron} from "react-bootstrap";



class StartP extends React.Component {
    render() {
        return(
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to Movies and reviews</h1>
                <p>
                    Movies: To view Movies go to the movies link in the navigation bar, from there you can
                    add a movie, edit it, or delete it, check details of movie, add a review on movie.
                    To add a movie you need to have added actors and directors first.
                    Add review is at the bottom of the movie details page.<br/><br/><br/>
                    Directors:There you can add a director, view the list of directors, edit or delete them. <br/><br/><br/>
                    Actors:There you can add actors, view the list of actors, edit or delete them.
                </p>

            </Jumbotron>
        )
    }
}

export default StartP;