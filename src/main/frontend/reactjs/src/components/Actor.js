import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Table, Card, Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

class Actor extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            actors : []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/actors").then(response =>response.data).then((data) =>{
            this.setState({actors: data});
        });
    }

    deleteActor = (actorId) =>{
        console.log("check"+actorId);
        axios.delete("http://localhost:8080/actors/"+actorId)
            .then(response => {
                if (response.data != null){
                    alert("Actor deleted!");
                    this.setState({
                        actors: this.state.actors.filter(actor => actor.id !== actorId)
                    });
                }

            });
    }
    render() {
        return(
            <Card className = {"border border-dark bg-dark text-white"}>
                <Card.Header>Actors:
                    <Link to={"/actors/add"} className="btn float-right btn-outline-info bg-info text-white" >Add Actors</Link>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.actors.length === 0 ?
                                <tr align="center">
                                    <td colSpan ="4">No Actors Added.</td>
                                </tr> :
                                this.state.actors.map((actor)=> (
                                    <tr key = {actor.id}>
                                        <td>{actor.id}</td>
                                        <td>{actor.name}</td>
                                        <td>{actor.age}</td>
                                        <td>
                                            <Link to={"actors/edit/"+actor.id} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;/&nbsp;
                                            <Button size="sm" variant="outline-danger" onClick ={this.deleteActor.bind(this, actor.id)}>
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
export default Actor;