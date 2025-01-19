import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import '../../styles/RegisterPageStyles.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useAuthContext";
import { useTranslation } from "react-i18next"; // Import translations

const RegisterPage: React.FC = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerUser } = useAuthContext();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const success = await registerUser(username, password, email);

    if (success) {
      toast.success(t("common.success"));
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <Container className="auth-container mb-3">
        <Row className="justify-content-center align-items-center vh-100">
          <Col md={6} className="auth-box h-50 bg-white rounded">
            <h2 className="text-center mt-3">{t("register.title")}</h2>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="username">
                <Form.Label>{t("register.username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("register.usernamePlaceholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="mt-2">{t("register.password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("register.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className="mt-2">{t("register.email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("register.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="warning"
                type="submit"
                className="w-100 d-block mt-3"
              >
                {t("register.register")}
              </Button>
            </Form>
          </Col>

          <Col
            md={6}
            className="auth-box auth-box-right h-50 d-flex flex-column justify-content-center align-items-center text-center rounded"
          >
            <h3 className="text-center">{t("register.haveAccount")}</h3>
            <Link to="/login">
              <Button variant="warning" className="w-100 mt-3">
                {t("register.login")}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default RegisterPage;
