import React from "react";
import axios from "axios";
import {Button, Card, Table, Form, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


class MovieDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movie : '',
            director:'',
            title:'',
            rating:'',
            review:'',
            allreviews:[]
        };
        this.ReviewChange = this.ReviewChange.bind(this);
    }

    updateMovie = event =>{
        event.preventDefault();
        const review ={
            title:this.state.title,
            review:this.state.review,
            rating:this.state.rating
        };
        const movie = this.state.movie;
        axios.post("http://localhost:8080/review/"+movie.id, review).then(response=> {
            if (response.data != null){
                alert("Review Added!");
                this.movieRead();
                this.setState({title:'',rating:'',review:''});
            }
        })
    }


    ReviewChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
        console.log(event.target.name,event.target.value);
    }

    componentDidMount() {
            this.movieRead();
    }
    movieRead=()=>{
        axios.get("http://localhost:8080/movies/"+this.props.match.params.id).then(response =>response.data).then((data) =>{
            this.setState({movie: data, director:data.director});
        });
    }

    render() {
        return(
            <Card className = {"border border-dark bg-dark text-white"}>
                <Card.Header>Movie:
                    <Form.Group controlId="formGridTitle">
                        <Form.Label column sm="2">
                            Title:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control className = "text-white border border-light" plaintext readOnly defaultValue={this.state.movie.name}/>
                        </Col>
                    </Form.Group>
                        <Form.Group controlId="formGridYear">
                            <Form.Label column sm="2">
                                Year:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control className = "text-white border border-light" plaintext readOnly defaultValue={this.state.movie.year}/>
                            </Col>
                        </Form.Group>
                    <Form.Group controlId="formGridRating">
                        <Form.Label column sm="2">
                            Rating:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control className = "text-white border border-light" plaintext readOnly defaultValue={this.state.movie.rating}/>
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formGridDirector">
                        <Form.Label column sm="2">
                            Director:
                        </Form.Label>
                        <Col sm="10">

                            {console.log(this.state.director)}

                                < Form.Control className="text-white border border-light" plaintext readOnly
                                defaultValue={this.state.director.name}/>

                        </Col>
                    </Form.Group>
                </Card.Header>
                <Card.Body>
                    Actors:
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.movie.actors == null ?
                                <tr align="center">
                                    <td colSpan ="5">No Actors Added.</td>
                                </tr> :
                                this.state.movie.actors.map((actor)=> (
                                    <tr key = {actor.id}>
                                        <td>{actor.id}</td>
                                        <td>{actor.name}</td>
                                        <td>{actor.age}</td>
                                    </tr>
                                ))
                        }

                        </tbody>
                    </Table>


                    Reviews:
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Review</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.movie.reviews == null ?
                                <tr align="center">
                                    <td colSpan ="5">No Reviews Added.</td>
                                </tr> :
                                this.state.movie.reviews.map((review)=> (
                                    <tr key = {review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.title}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.review}</td>
                                    </tr>
                                ))
                        }

                        </tbody>
                    </Table>

                    Add a review:
                    <Form onSubmit={this.updateMovie} controlId="ReviewFormId">
                        <Form.Group controlId="form1Title">
                            <Form.Label>Title of review</Form.Label>
                            <Form.Control required
                                type="text"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.ReviewChange}
                                name="title"
                            />
                        </Form.Group>
                        <Form.Group controlId="form1Rating">
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control required
                                min="1"
                                max="5"
                                name="rating"
                                value={this.state.rating}
                                onChange={this.ReviewChange}
                                type="number"
                                placeholder="Rating"
                            />
                        </Form.Group>
                        <Form.Group controlId="form1Review">
                            <Form.Label>Review:</Form.Label>
                            <Form.Control required
                                          name="review"
                                          value={this.state.review}
                                          onChange={this.ReviewChange}
                                          as="textarea"
                                          rows="3" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        )
    }

}
    export default MovieDetails;