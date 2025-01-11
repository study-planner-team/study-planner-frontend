import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import { useAuthContext } from "../../context/useAuthContext";
import { useTranslation } from "react-i18next";
import VisSettingsBox from "./VisSettingsBox";

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const [t, i18n] = useTranslation("global");

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
                {t("header.studyplans")}
              </Nav.Link>
              <Nav.Link as={Link} to="/publicstudyplans">
                {t("header.publicstudyplans")}
              </Nav.Link>
              <Nav.Link as={Link} to="/calendar">
                {t("header.calendar")}
              </Nav.Link>
              <Nav.Link as={Link} to="/sessions/active">
                {t("header.sessions")}
              </Nav.Link>
              <Nav.Link as={Link} to="/statistics">
                {t("header.statistics")}
              </Nav.Link>
            </Nav>
          )}
          <VisSettingsBox/>

          <Nav>
            {!isLoggedIn() ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="btn-custom w-100 text-left"
                >
                  {t("header.user.register")}
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  {t("header.user.login")}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">
                  {user?.username}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>{t("header.user.logout")}</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
