import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../context/useAuthContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser, deleteUser } = useAuthContext();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isPublic, setIsPublic] = useState(user?.isPublic || false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const updatedData = { username, email, isPublic };
        await updateUser(user.id, updatedData);
        alert("Profile updated successfully!");
      } catch (error: any) {
        if (Array.isArray(error)) {
          setErrors(error.map((err: any) => err.errorMessage));
        } else {
          setErrors(["Failed to update profile. Please try again"]);
        }
      }
    }
  };

  const handleDelete = async () => {
    if (user && window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteUser(user.id);
      } catch (error: any) {
        if (Array.isArray(error)) {
          setErrors(error.map((err: any) => err.errorMessage));
        } else {
          setErrors(["Failed to delete account. Please try again"]);
        }
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="auth-container mt-5 mb-3">
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="d-none d-md-block">
            <img src="/assets/svg/edit_profile.svg" alt="Edit Profile" className="img-fluid" />
          </Col>

          <Col md={6} className="bg-light p-4 rounded">
            <h2 className="text-center">Konto</h2>
            {errors.length > 0 && (
              <div className="mt-3 mb-5">
                {errors.map((error, index) => (
                  <p key={index} className="text-danger mb-0">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="username">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nazwa użytkownika"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="********"
                  disabled
                />
                <a href="/change-password" style={{ marginLeft: "10px" }}>Zmień hasło</a>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="jan.nowak@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="accountStatus">
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
              <Button variant="warning" type="submit" className="w-100 mt-3">Zapisz</Button>
              <Button variant="danger" type="button" onClick={handleDelete} className="w-100 mt-3">Usuń konto</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};


export default ProfilePage;