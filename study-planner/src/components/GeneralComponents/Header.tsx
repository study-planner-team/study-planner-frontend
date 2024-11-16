import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import { useAuthContext } from "../../context/useAuthContext";

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
    <Navbar collapseOnSelect expand="lg" className="navbar-custom" variant="dark">
      <Container className="navbar-wrapper">
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Study Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isLoggedIn() && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/studyplans">
                Plany nauki
              </Nav.Link>
              <Nav.Link as={Link} to="/publicstudyplans">
                Publiczne Plany nauki
              </Nav.Link>
              <Nav.Link as={Link} to="/calendar">
                Kalendarz
              </Nav.Link>
            </Nav>
          )}

          <Nav>
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
