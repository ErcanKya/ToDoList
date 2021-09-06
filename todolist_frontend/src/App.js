import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Todo from "./components/Todo/Todo";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CatchError  from "./components/CatchError";



const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add" exact component={Todo} />
              <Route path="/edit/:id" exact component={Todo} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={() => (
                  <Login message="User Logged Out Successfully." />
                )}
              />
              <Route component={CatchError}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
