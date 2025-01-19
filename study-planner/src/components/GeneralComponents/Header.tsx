import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import { useAuthContext } from "../../context/useAuthContext";
import { useTranslation } from "react-i18next";
import VisSettingsBox from "./VisSettingsBox";

const Header: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuthContext();
  const [t] = useTranslation("global");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 995);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar-custom"
      variant="dark"
    >
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
              <Nav.Link as={Link} to="/public-users">
                {t("header.public-users")}
              </Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto align-items-lg-center flex-column flex-lg-row text-start text-lg-end">
            {isMobile ? (
              <>
                <Nav.Link
                  href="https://dokumentacja-uzytkownika-study-p.gitbook.io/dokumentacja-uzytkownika-study-panner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-lg-2"
                >
                  {t("header.user-docs")}
                </Nav.Link>
                <Nav.Link
                  href="https://study-planner.gitbook.io/study-planner-deweloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-lg-3"
                >
                  {t("header.tech-docs")}
                </Nav.Link>
              </>
            ) : (
              <>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="user-docs-tooltip">
                      {t("header.user-docs-tooltip")}
                    </Tooltip>
                  }
                >
                  <Nav.Link
                    href="https://dokumentacja-uzytkownika-study-p.gitbook.io/dokumentacja-uzytkownika-study-panner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-lg-2"
                  >
                    {t("header.user-docs")}
                  </Nav.Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tech-docs-tooltip">
                      {t("header.tech-docs-tooltip")}
                    </Tooltip>
                  }
                >
                  <Nav.Link
                    href="https://study-planner.gitbook.io/study-planner-deweloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-lg-3"
                  >
                    {t("header.tech-docs")}
                  </Nav.Link>
                </OverlayTrigger>
              </>
            )}
            <div className="vis-settings-box mb-2 mb-lg-0 me-lg-3">
              <VisSettingsBox />
            </div>
            {!isLoggedIn() ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="btn-custom w-100 w-lg-auto mt-2 mt-lg-0 me-lg-2"
                >
                  {t("header.user.register")}
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="w-100 w-lg-auto mt-2 mt-lg-0"
                >
                  {t("header.user.login")}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile" className="me-lg-2">
                  {user?.username}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="me-lg-2">
                  {t("header.user.logout")}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
