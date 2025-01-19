import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/FooterStyles.css";

const Footer: React.FC = () => {
  return (
    <Container fluid className="footer mt-auto">
      <span className="footer-border"></span>
      <Container className="d-flex justify-content-between align-items-center">
        <p className="mb-0 text-center flex-grow-1">Study Planner © 2024</p>
      </Container>
    </Container>
  );
};

export default Footer;
