import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../../context/useAuthContext";
import { toast } from "react-toastify";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage: React.FC = () => {
  const { user, changePassword } = useAuthContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    if (user) {
      const success = await changePassword(user.id, oldPassword, newPassword);
      if (success) {
        toast.success("Password successfully changed!");
        navigate("/profile");
      } else {
        toast.error("Failed to change password");
      }
    }
  };

  return (
    <>
    <Header />
    <Container className="auth-container mt-5 mb-3">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="bg-light p-4 rounded">
          <h2 className="text-center">Change Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="w-100 mt-3">
              Change Password
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