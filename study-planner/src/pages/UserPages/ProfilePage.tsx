import React, { useState } from "react";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import translations

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const { user, updateUser, deleteUser } = useAuthContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isPublic, setIsPublic] = useState(user?.isPublic || false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedData = { username, email, isPublic };
      const success = await updateUser(user.id, updatedData);

      if (success) {
        toast.success(t("profile.updateSuccess"));
      }
    }
  };

  const handleDelete = async () => {
    if (user && window.confirm(t("profile.deleteConfirmation"))) {
      const success = await deleteUser(user.id);

      if (success) {
        toast.success(t("profile.deleteSuccess"));
      }
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <Container className="auth-container mt-5 mb-3">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img
              src="/assets/svg/edit_profile.svg"
              alt={t("profile.editProfileImageAlt")}
              className="img-fluid"
            />
          </Col>

          <Col md={6} className="bg-light p-4 rounded">
            <h2 className="text-center">{t("profile.title")}</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="username">
                <Form.Label>{t("profile.username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("profile.usernamePlaceholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>{t("profile.password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  disabled
                />
                <a href="/change-password" style={{ marginLeft: "10px" }}>
                  {t("profile.changePassword")}
                </a>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>{t("profile.email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("profile.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="accountStatus">
                <Form.Label>{t("profile.accountStatus")}</Form.Label>
                <Form.Control
                  as="select"
                  value={isPublic ? "Publiczny" : "Prywatny"}
                  onChange={(e) => setIsPublic(e.target.value === "Publiczny")}
                >
                  <option value="Prywatny">{t("profile.private")}</option>
                  <option value="Publiczny">{t("profile.public")}</option>
                </Form.Control>
              </Form.Group>
              <Button variant="warning" type="submit" className="w-100 mt-3">
                {t("profile.save")}
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={handleDelete}
                className="w-100 mt-3"
              >
                {t("profile.delete")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
