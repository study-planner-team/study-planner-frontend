import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/FooterStyles.css';

const Footer: React.FC = () => {
    return (
      <Container fluid className="footer">
        <span className="footer-border"></span>
        <Container className="text-center">
          <p className="mb-0">Study Planner © 2024</p>
        </Container>
      </Container>
    );
  };

export default Footer;