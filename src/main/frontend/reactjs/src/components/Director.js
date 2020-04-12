import React from "react";
import {Table, Card, Button} from "react-bootstrap";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash,faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class Director extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            directors : []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/directors").then(response =>response.data).then((data) =>{
            this.setState({directors: data});
        });
    }

    deleteDirector = (directorId) =>{
     axios.delete("http://localhost:8080/directors/"+directorId)
         .then(response => {
             if (response.data != null){
                 alert("Director deleted!");
                 this.setState({
                     directors: this.state.directors.filter(director => director.id !== directorId)
                 });
             }

         });
    }
    render() {
        return(
            <Card className = {"border border-dark bg-dark text-white"}>
                <Card.Header>Directors:
                    <Link to={"/directors/add"} className="btn float-right btn-outline-info bg-info text-white" >Add Director</Link>
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
                            this.state.directors.length === 0 ?
                                <tr align="center">
                                    <td colSpan ="4">Directors Added.</td>
                                </tr> :
                                this.state.directors.map((director)=> (
                                    <tr key = {director.id}>
                                        <td>{director.id}</td>
                                        <td>{director.name}</td>
                                        <td>{director.age}</td>
                                        <td>
                                            <Link to={"directors/edit/"+director.id} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faEdit}/></Link> &nbsp;/&nbsp;
                                            <Button size="sm" variant="outline-danger" onClick ={this.deleteDirector.bind(this, director.id)}>
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

export default Director;