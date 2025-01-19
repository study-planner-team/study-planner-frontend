import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import '../../styles/RegisterPageStyles.css';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next"; // Import translations

const LoginPage: React.FC = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loginWithGoogle } = useAuthContext();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await loginUser(username, password);

    if (success) {
      navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const jwtToken = credentialResponse.credential;
    const success = await loginWithGoogle(jwtToken);

    if (success) {
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <Container className="auth-container">
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6} className="auth-box h-50 bg-white rounded">
            <h2 className="text-center mt-3">{t("login.title")}</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Label>{t("login.username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("login.usernamePlaceholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="mt-2">{t("login.password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex align-items-center mt-3" style={{ gap: "2px" }}>
                <Button variant="warning" type="submit" className="flex-grow-1">
                  {t("login.login")}
                </Button>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error(t("login.googleLoginFailed"))}
                    theme="filled_blue"
                    type="icon"
                    size="large"
                  />
                </GoogleOAuthProvider>
              </div>
            </Form>
          </Col>
  
          <Col
            md={6}
            className="auth-box auth-box-right h-50 d-flex flex-column justify-content-center align-items-center text-center rounded"
          >
            <h3 className="text-center">{t("login.welcomeMessage")}</h3>
            <Link to="/register">
              <Button variant="warning" className="w-100 mt-3">
                {t("login.register")}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );  
}  

export default LoginPage;
