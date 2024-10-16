import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/HeaderStyles.css";
import { useAuthContext } from "../context/useAuthContext";

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Navbar variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Study Planner
        </Navbar.Brand>
        {isLoggedIn() && (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/studyplans">
              Plany nauki
            </Nav.Link>
          </Nav>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn() ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="btn-custom w-100 text-left"
                >
                  Rejestracja
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">
                  {user?.username}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
