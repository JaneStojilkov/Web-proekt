import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component{
    render() {
        return(
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link to={"/movies"} className={"nav-link"}>Movies</Link>
                        <Link to={"/directors"} className="nav-link">Directors</Link>
                        <Link to={"/actors"} className="nav-link">Actors</Link>
                    </Nav>
                </Navbar>
        )

    }
}

export default NavigationBar;