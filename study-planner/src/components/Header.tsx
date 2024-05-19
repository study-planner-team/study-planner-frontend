import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HeaderStyles.css';

const Header: React.FC = () => {
  return (
    <Navbar variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">Study Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/register" className="btn-custom w-100 text-left">Rejestracja</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;


