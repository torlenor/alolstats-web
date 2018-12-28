import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class NavigationBar extends Component {
    render() {
        return (
          <div className="App container">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">ALoLStats</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
              <Nav>
              <LinkContainer to="/freerotation">
                    <NavItem>Free Rotation</NavItem>
                </LinkContainer>
                <LinkContainer to="/champions">
                    <NavItem>Champions</NavItem>
                </LinkContainer>
                <LinkContainer to="/summoners">
                    <NavItem>Summoners</NavItem>
                </LinkContainer>
                <LinkContainer to="/matches">
                    <NavItem>Matches</NavItem>
                </LinkContainer>
            </Nav>

            <Nav pullRight>
                <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
          </div>
        );
      }
    }
    
    export default NavigationBar;
    