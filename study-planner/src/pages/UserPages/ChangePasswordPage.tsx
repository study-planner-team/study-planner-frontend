import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/useAuthContext";
import { toast } from "react-toastify";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChangePasswordPage: React.FC = () => {
  const { t } = useTranslation("global");
  const { user, changePassword } = useAuthContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("changePassword.mismatchError"));
      return;
    }

    if (user) {
      const success = await changePassword(user.id, oldPassword, newPassword);
      if (success) {
        toast.success(t("changePassword.successMessage"));
        navigate("/profile");
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="auth-container mt-5 mb-3">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="bg-light p-4 rounded">
            <h2 className="text-center">{t("changePassword.title")}</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="oldPassword">
                <Form.Label>{t("changePassword.oldPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("changePassword.oldPasswordPlaceholder")}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="newPassword" className="mt-3">
                <Form.Label>{t("changePassword.newPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("changePassword.newPasswordPlaceholder")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>{t("changePassword.confirmPassword")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("changePassword.confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100 mt-3">
                {t("changePassword.submitButton")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ChangePasswordPage;
