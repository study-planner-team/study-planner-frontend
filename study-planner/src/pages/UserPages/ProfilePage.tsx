import React, { useState } from "react";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import translations
import BadgeGrid from "../../components/BadgeComponents/BadgeGrid";

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
        <Row className="d-flex align-items-stretch">
          {/* Left Column: Badges */}
          <Col md={6}>
            <div className="bg-light p-4 rounded shadow-sm h-100 d-flex flex-column">
              <h2 className="text-center mb-4">Twoje odznaki</h2>
              <BadgeGrid userId={user!.id} />
            </div>
          </Col>

          {/* Right Column: Profile Form */}
          <Col md={6}>
            <div className="bg-light p-4 rounded shadow-sm h-100 d-flex flex-column">
              <h2 className="text-center">Konto</h2>
              <Form onSubmit={handleUpdate} className="mt-3 flex-grow-1">
                <Form.Group controlId="username">
                  <Form.Label>Nazwa użytkownika</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control type="password" placeholder="********" disabled />
                  <a href="/change-password" style={{ marginLeft: "10px" }}>
                    Zmień hasło
                  </a>
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Adres email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="jan.nowak@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="accountStatus" className="mt-3">
                  <Form.Label>Status konta</Form.Label>
                  <Form.Control
                    as="select"
                    value={isPublic ? "Publiczny" : "Prywatny"}
                    onChange={(e) => setIsPublic(e.target.value === "Publiczny")}
                  >
                    <option value="Prywatny">Prywatny</option>
                    <option value="Publiczny">Publiczny</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100 mt-3">
                  Zapisz
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={handleDelete}
                  className="w-100 mt-3"
                >
                  Usuń konto
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;