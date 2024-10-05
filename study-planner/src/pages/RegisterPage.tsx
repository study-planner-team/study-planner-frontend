import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/RegisterPageStyles.css';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    

    try {
      const response = await AuthService.register(username, password, email);
      setMessage(response.data);
      setErrors([]);
      navigate('/');
    } catch (error) {
      if (Array.isArray(error)) {
        setErrors(error.map((err: any) => err.errorMessage));
      } else {
        setErrors(["Registration failed."]);
      }
    }

  }
  
  return (
    <>
      <Header />
    <Container className="auth-container mb-3">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="auth-box h-50 bg-white ">
          <h2 className="text-center mt-2">Rejestracja</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="username">
              <Form.Label>Nazwa użytkownika</Form.Label>
              <Form.Control type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Adres email</Form.Label>
              <Form.Control type="email" placeholder="Adres email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 d-block mt-3">Zarejestruj</Button>
            <Button variant="danger" type="button" className="w-100 d-block mt-3">Register with Google</Button>
          </Form>
          
          {message && <p className="text-success mt-3">{message}</p>}
            {errors.length > 0 && (
              <div className="mt-3 mb-5">
                {errors.map((error, index) => (
                  <p key={index} className="text-danger mb-0">{error}</p>
                ))}
              </div>
            )}
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