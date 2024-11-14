import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Header from '../../components/GeneralComponents/Header';
import Footer from '../../components/GeneralComponents/Footer';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../context/useAuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, loginWithGoogle } = useAuthContext();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await loginUser(username, password);

    if (success) {
      navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const jwtToken = credentialResponse.credential; // Extract the JWT token from the response
    const success = await loginWithGoogle(jwtToken);

    if (success) {
      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <Container className="auth-container mb-3">
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6} className="auth-box h-50 bg-white ">
            <h2 className="text-center mt-2">Logowanie</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Link to="/forgot-password" className="d-block mt-2 mb-2">Nie pamiętam hasła</Link>
              <Button variant="warning" type="submit" className="w-100 d-block mt-3 mb-3">Login</Button>

              {/* Google OAuth Provider and Login Button */}
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.error('Google login failed')}
                  theme="filled_blue"
                />
              </GoogleOAuthProvider>
            </Form>
          </Col>

          <Col md={6} className="auth-box auth-box-right h-50 d-flex flex-column justify-content-center align-items-center text-center">
            <h3 className="text-center">Witaj!<br />Nie masz jeszcze konta?</h3>
            <Link to="/register">
              <Button variant="warning" className="w-100 mt-3">Zarejestruj się</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
