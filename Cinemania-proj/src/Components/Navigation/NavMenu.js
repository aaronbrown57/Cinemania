import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useContext } from "react";
function NavMenu ( {loggedIn, loggedOut, admin}) {
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <h3>Cinemania </h3>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedIn && admin === false && <Nav.Link href="/Edit">Edit Profile</Nav.Link>}
            {admin && <Nav.Link href="/Manage Users">Manage Users</Nav.Link>}
            {admin && <Nav.Link href="/Movie Scheduling">Movie Scheduling</Nav.Link>}
            <br></br>
            {loggedIn && <Nav.Link href='/Logout'>Logout</Nav.Link>}
            {loggedOut && <Nav.Link href='/Login'>Login</Nav.Link>}
           
            <br></br>
           
            {loggedIn && <Nav.Link href="/order-history">Order History</Nav.Link>}
            {admin && <Nav.Link href="/manage-promos">Manage Promotions</Nav.Link>}
            <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavMenu;