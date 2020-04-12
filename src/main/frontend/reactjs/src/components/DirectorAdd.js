import React from "react";
import {Form, Card, Button} from "react-bootstrap";
import axios from "axios";

class DirectorAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.SubmitDirector = this.SubmitDirector.bind(this);
        this.DirectorChange = this.DirectorChange.bind(this);
    }

    initialState = {
        id:'', name:'', age:0
    }

    componentDidMount() {
        const directorId =+this.props.match.params.id;
        if (directorId){
            this.findDirectorById(directorId);
        }
    }

    findDirectorById = (directorId) =>{
        axios.get("http://localhost:8080/directors/"+directorId).then(response => {
            if (response.data != null){
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    age: response.data.age
                });
            }
        }).catch((error) =>{
            console.error("Error:"+error);
        });
    }


    SubmitDirector= event =>{
        event.preventDefault();

        const director = {
          name:this.state.name,
            age:this.state.age
        };

        axios.post("http://localhost:8080/directors", director).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                alert("Director Added!");
            }
        })
    }

    UpdateDirector = event => {
        event.preventDefault();

        const director = {
            id:this.state.id,
            name:this.state.name,
            age:this.state.age
        };

        axios.put("http://localhost:8080/directors/"+this.state.id, director).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                alert("Director Updated!");
            }
        })
    }

    DirectorChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return(
            <Form onSubmit={this.state.id ? this.UpdateDirector :this.SubmitDirector} id = "DirectorFormId">
            <Card className = {"border border-dark bg-dark text-white"}>
                <Card.Header>{this.state.id ? "Edit Director:":"Add Director:"}
                </Card.Header>
                <Card.Body>
                        <Form.Group controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required autoComplete = "off"
                                name="name"
                                type="text"
                                placeholder="Enter Name"
                                value={this.state.name}
                                onChange={this.DirectorChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGridAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control required autoComplete = "off"
                                min="5"
                                max="200"
                                name="age"
                                type="number"
                                placeholder="Age"
                                value={this.state.age}
                                onChange={this.DirectorChange}
                            />
                        </Form.Group>
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

export default DirectorAdd;