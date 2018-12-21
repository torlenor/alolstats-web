import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

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
                <NavItem href="/signup">Free Rotation</NavItem>
                <NavItem href="/login">Champions</NavItem>
                <NavItem href="/login">Summoners</NavItem>
                <NavItem href="/login">Matches</NavItem>
            </Nav>

            <Nav pullRight>
                <NavItem href="/signup">Signup</NavItem>
                <NavItem href="/login">Login</NavItem>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
          </div>
        );
      }
    }
    
    export default NavigationBar;
    