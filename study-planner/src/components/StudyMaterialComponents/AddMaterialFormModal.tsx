import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations

interface AddMaterialModalProps {
  topicId: number;
  show: boolean;
  onHide: () => void;
  onSubmit: (topicId: number, materialData: { title: string; link: string }) => void;
}

const AddMaterialFormModal: React.FC<AddMaterialModalProps> = ({
  topicId,
  show,
  onHide,
  onSubmit,
}) => {
  const { t } = useTranslation("global");
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(topicId, { title, link });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("studyMaterials.addMaterial")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>{t("studyMaterials.materialName")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("studyMaterials.materialNamePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="link" className="mt-3">
            <Form.Label>{t("studyMaterials.link")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("studyMaterials.linkPlaceholder")}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              {t("common.cancel")}
            </Button>
            <Button variant="primary" type="submit">
              {t("common.add")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMaterialFormModal;
