import React from "react";
import {Form, Card, Button} from "react-bootstrap";
import axios from "axios";

class ActorAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.SubmitActor = this.SubmitActor.bind(this);
        this.ActorChange = this.ActorChange.bind(this);
    }

    initialState = {
        id:'', name:'', age:0
    }

    componentDidMount() {
        const actorId =+this.props.match.params.id;
        if (actorId){
            this.findActorById(actorId);
        }
    }

    findActorById = (actorId) =>{
        axios.get("http://localhost:8080/actors/"+actorId).then(response => {
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


    SubmitActor= event =>{
        event.preventDefault();

        const actor = {
            name:this.state.name,
            age:this.state.age
        };

        axios.post("http://localhost:8080/actors", actor).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                alert("Actor Added!");
            }
        })
    }

    UpdateActor = event => {
        event.preventDefault();

        const actor = {
            id:this.state.id,
            name:this.state.name,
            age:this.state.age
        };

        axios.put("http://localhost:8080/actors/"+this.state.id, actor).then(response=> {
            if (response.data != null){
                this.setState(this.initialState);
                alert("Actor Updated!");
            }
        })
    }

    ActorChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return(
            <Form onSubmit={this.state.id ? this.UpdateActor :this.SubmitActor} id = "ActorFormId">
                <Card className = {"border border-dark bg-dark text-white"}>
                    <Card.Header>{this.state.id ? "Edit Actor:":"Add Actor:"}
                    </Card.Header>
                    <Card.Body>
                        <Form.Group controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required autoComplete = "off"
                                          name="name"
                                          type="text"
                                          placeholder="Enter Name"
                                          value={this.state.name}
                                          onChange={this.ActorChange}
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
                                          onChange={this.ActorChange}
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
export default ActorAdd;