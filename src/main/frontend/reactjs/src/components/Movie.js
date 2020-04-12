import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Table, Card, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash,faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class Movie extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            movies : []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/movies").then(response =>response.data).then((data) =>{
            this.setState({movies: data});
        });
    }

    deleteMovie = (movieId) =>{
        axios.delete("http://localhost:8080/movies/"+movieId)
            .then(response => {
                if (response.data != null){
                    alert("Movie deleted!");
                    this.setState({
                        movies: this.state.movies.filter(movie => movie.id !== movieId)
                    });
                }

            });
    }
    render() {
        return(
            <Card className = {"border border-dark bg-dark text-white"}>
                <Card.Header>Movies:
                    <Link to={"/movies/add"} className="btn float-right btn-outline-info bg-info text-white" >Add Movies</Link>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Year</th>
                            <th>Details/Edit/Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.movies.length === 0 ?
                                <tr align="center">
                                    <td colSpan ="5">No Movies Added.</td>
                                </tr> :
                                this.state.movies.map((movie)=> (
                                    <tr key = {movie.id}>
                                        <td>{movie.id}</td>
                                        <td>{movie.name}</td>
                                        <td>{movie.rating}</td>
                                        <td>{movie.year}</td>
                                        <td>
                                            <Link to={"movies/details/"+movie.id} className="btn btn-sm btn-outline-success"><FontAwesomeIcon icon={faInfoCircle}/></Link> &nbsp;/&nbsp;
                                            <Link to={"movies/edit/"+movie.id} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;/&nbsp;
                                            <Button size="sm" variant="outline-danger" onClick ={this.deleteMovie.bind(this, movie.id)}>
                                                <FontAwesomeIcon icon = {faTrash}/></Button>
                                        </td>
                                    </tr>
                                ))
                        }

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        )
    }

}
export default Movie;