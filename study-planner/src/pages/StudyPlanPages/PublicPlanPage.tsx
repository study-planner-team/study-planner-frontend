import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import { usePublicPlans } from "../../hooks/usePublicPlans";
import "../../styles/StudyPlanStyles.css";
import StudyPlanCard from "../../components/StudyPlanComponents/StudyPlanCard";

const PublicPlanPage: React.FC = () => {
  const { t } = useTranslation("global");
  const { filteredPlans, handleFilter, handleJoin } = usePublicPlans();
  const inputElement = document.getElementById("plan-search") as HTMLInputElement | null;

  if (inputElement) {
    inputElement.addEventListener("input", handleFilter);
  }

  return (
    <>
      <Header />
      <Container className="my-5 custom-container">
        <div>
          <h2 className="text-center">{t("studyPlans.publicPlans")}</h2>
        </div>
        <div className="d-flex justify-content-center mb-3 mt-3">
          <Form.Control
            type="text"
            id="plan-search"
            placeholder={t("studyPlans.searchPlaceholder")}
            className="w-25 rounded-lg shadow-sm text-center"
          />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <div className="custom-line"></div>
        </div>
        <Row>
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan, index) => (
              <Col key={index} className="mb-4" md="auto">
                <StudyPlanCard
                  plan={plan}
                  onActionClick={() => handleJoin(plan.studyPlanId)}
                  actionLabel={t("studyPlans.join")}
                  actionVariant="danger"
                />
              </Col>
            ))
          ) : (
            <p>{t("studyPlans.noPlans")}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PublicPlanPage;
