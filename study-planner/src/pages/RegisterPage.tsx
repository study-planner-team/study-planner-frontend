import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/RegisterPageStyles.css';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Header />
    <Container className="auth-container mb-3">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="auth-box h-50 bg-white">
          <h2 className="text-center mt-2">Rejestracja</h2>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control type="text" placeholder="Nazwa użytkownika"/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Hasło" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Adres email</Form.Label>
              <Form.Control type="email" placeholder="Adres email" />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 d-block mt-3">Zarejestruj</Button>
            <Button variant="danger" type="button" className="w-100 d-block mt-3">Register with Google</Button>
          </Form>
        </Col>
        <Col md={6} className="auth-box auth-box-right h-50 d-flex flex-column justify-content-center align-items-center text-center">
          <h3 className="text-center">Witaj!<br/>Masz już u nas konto?</h3>
          <Link to="/login">
            <Button variant="warning" className="w-100 mt-3">Zaloguj się</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
};

export default RegisterPage;