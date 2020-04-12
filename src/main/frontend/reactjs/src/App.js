import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container,Row,Col} from "react-bootstrap";
import StartP from "./components/StartP";
import{BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Director from "./components/Director";
import DirectorAdd from "./components/DirectorAdd";
import Actor from "./components/Actor";
import ActorAdd from "./components/ActorAdd";
import Movie from "./components/Movie";
import MovieAdd from "./components/MovieAdd";
import MovieDetails from "./components/MovieDetails";


function App() {
    const marginTop = {
        marginTop : "20px"
    };
  return (
    <Router>
        <NavigationBar/>
    <Container>
        <Row>
          <Col lg={12} style={marginTop}>
              <Switch>
                  <Route path="/" exact component={StartP}/>
                  <Route path="/directors" exact component={Director}/>
                  <Route path="/directors/add" exact component={DirectorAdd}/>
                  <Route path="/directors/edit/:id" exact component={DirectorAdd}/>
                  <Route path = "/actors" exact component = {Actor}/>
                  <Route path = "/actors/add" exact component = {ActorAdd}/>
                  <Route path = "/actors/edit/:id" exact component={ActorAdd}/>
                  <Route path = "/movies" exact component = {Movie}/>
                  <Route path = "/movies/add" exact component = {MovieAdd}/>
                  <Route path = "/movies/edit/:id" exact component={MovieAdd}/>
                  <Route path = "/movies/details/:id" exact component={MovieDetails}/>
              </Switch>

          </Col>
        </Row>
    </Container>
    </Router>
  );
}

export default App;
