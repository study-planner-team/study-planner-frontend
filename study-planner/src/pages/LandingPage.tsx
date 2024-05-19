import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import '../styles/LandingPageStyles.css';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container fluid className="mt-5">
        <Row className="align-items-center">
            <Col md={6}>
            <img src="/assets/svg/undraw_learning_re_32qv.svg" alt="Illustration" className="img-fluid" />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center align-items-center text-center">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel posuere neque eget porttitor.</h2>
            <Button variant="warning" className="mt-3">Przycisk</Button>
          </Col>
        </Row>
        <Row className="mt-4" id="braker-row">
          <Col>
            <h4 className="text-center fw-bold mb-0 p-3">Czytaj więcej</h4>
          </Col>
        </Row>
      </Container>
      <Container fluid className="text-white py-5" id="dark-background">
        <Container>
          <h3 className="text-center mb-4">Główne funkcjonalności</h3>
          <Row>
            <Col md={4} className="text-center">
              <FeatureCard 
                title="Generowanie planów nauki"
                text="Lorem ipsum dolor sit amet"
                imageUrl="assets/svg/undraw_chat_bot_re_e2gj.svg"
              />
            </Col>
            <Col md={4} className="text-center">
              <FeatureCard 
                title="Nauka w grupach"
                text="Lorem ipsum dolor sit amet"
                imageUrl="assets/svg/undraw_selecting_team_re_ndkb.svg"
              />
            </Col>
            <Col md={4} className="text-center">
              <FeatureCard 
                title="Przypomnienia i notyfikacje"
                text="Lorem ipsum dolor sit amet"
                imageUrl="assets/svg/undraw_reminders_re_gtyb.svg"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
