import React from "react";
import {Form, Card, Button, Container, Col,Row} from "react-bootstrap";
import axios from "axios";


class MovieAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = this.initialState;
        this.SubmitMovie = this.SubmitMovie.bind(this);
        this.MovieChange = this.MovieChange.bind(this);


    }
    initialState = {
        id: '',
        name: '',
        rating: '',
        year: '',
        director: {
            id: ''
        },
        actors: [{
            id:null
        }],
        alldirectors: [],
        allactors: []
    }

    MovieChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
        console.log(event.target.name,event.target.value);
    }

    componentDidMount() {
        const movieId =+this.props.match.params.id;
        if (movieId) {
            this.findMovieById(movieId);
        }
        this.getAlldirectors();
        this.getAllactors();
        this.state.actors.pop();
    }

    findMovieById = (movieId) =>{
        axios.get("http://localhost:8080/movies/"+movieId).then(response => {
            if (response.data != null){
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    year: response.data.year,
                    rating: response.data.rating,
                    director:response.data.director,
                    actors:response.data.actors
                });
            }
        }).catch((error) =>{
            console.error("Error:"+error);
        });
    }


    getAlldirectors=()=>{
        axios.get("http://localhost:8080/directors").then(response =>response.data).then((data) =>{
            this.setState({alldirectors: data});
        });
}

    getAllactors=()=>{
        axios.get("http://localhost:8080/actors").then(response =>response.data).then((data) =>{
            this.setState({allactors: data});
        });
    }

    SubmitMovie= event =>{
        event.preventDefault();

        const movie = {
            name:this.state.name,
            year:this.state.year,
            rating:this.state.rating,
            director:
                {
                    id:this.state.director
                },
            actors:this.state.actors
        };
        console.log(movie);
        axios.post("http://localhost:8080/movies", movie).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                this.getAlldirectors();
                this.getAllactors();
                this.state.actors.pop();
                alert("Movie Added!");
            }
        })
    }

    updateMovie = event =>{
        event.preventDefault();

        const movie = {
            id:this.state.id,
            name:this.state.name,
            year:this.state.year,
            rating:this.state.rating,
            director:
                {
                    id:this.state.director
                },
            actors:this.state.actors
        };
        console.log(movie);
        axios.put("http://localhost:8080/movies/"+this.state.id, movie).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                this.getAlldirectors();
                this.getAllactors();
                this.state.actors.pop();
                alert("Movie Updated!");
            }
        })
    }

    render(){
        return(
        <Form onSubmit={this.state.id ? this.updateMovie:this.SubmitMovie}controlId="MovieFormId">
        <Card className = {"border border-dark bg-dark text-white"}>
            <Card.Header>{this.state.id ? "Update Movie:":"Add Movie:"}</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                    <Form.Group controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required
                                      autoComplete = "off"
                                    type="text"
                                    placeholder="Title"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.MovieChange}
                        />
                    </Form.Group>
                        </Col>
                        <Col>
                    <Form.Group controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control required
                            min = "1"
                            max = "5"
                            type="number"
                            placeholder="Rating"
                            name="rating"
                            value={this.state.rating}
                            onChange={this.MovieChange}
                        />
                    </Form.Group>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group controlId="formGridYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    min="0"
                                    type="number"
                                    placeholder="Year"
                                    name="year"
                                    value={this.state.year}
                                    onChange={this.MovieChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formGridDirector">
                                <Form.Label>Select Director</Form.Label>
                                <Form.Control as="select" required
                                              type="number"
                                              placeholder="Director"
                                              name="director"
                                              value={this.state.director}
                                              onChange={this.MovieChange}
                                >
                                    <option></option>

                                    {
                                        this.state.alldirectors.map((director)=>(
                                              <option selected = {this.state.director.id === director.id} key={director.id} value={director.id}>{director.name}</option>
                                            )
                                        )
                                    }

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formGridActor">
                        <Form.Label>Select Actors</Form.Label>
                        <Form.Control as="select" multiple required
                                      placeholder="Actor"
                                      name="actors"
                                      value={this.state.d}
                                      onClick={(e) =>{
                                          var newArray = this.state.actors;
                                          var index = e.target.value;
                                          var test = JSON.parse(JSON.stringify({"id":index}))
                                          var temp=true
                                          for(var i = 0; i < newArray.length; i++) {
                                              console.log("ID " + newArray[i].id)
                                              if (newArray[i].id == e.target.value) {
                                                  temp = false;
                                                  break;
                                              }
                                          }
                                          console.log("temp: "+temp);
                                          if(e.target.value!="Empty list"){
                                          if (temp) {
                                              newArray.push(test);
                                          }
                                          else if(!temp){
                                              var index = newArray.indexOf(e.target.value);
                                              newArray.splice(index, 1);
                                          }}
                                          else{

                                          }
                                          console.log(newArray);
                                          this.setState(
                                              {
                                                  [e.target.name]:newArray
                                              }
                                          )
                                      }}
                        >
                            {

                                this.state.allactors.map((actor)=>(
                                    <option key={actor.id} value={actor.id}>{actor.id},{actor.name}</option>
                                ))
                            }

                        </Form.Control>
                    </Form.Group>
                </Container>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Card.Footer>
        </Card>
        </Form>
        )
    }

}
 export default MovieAdd;