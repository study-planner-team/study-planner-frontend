import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import translations
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import ScheduleService from "../../services/ScheduleService";
import ScheduleBlock from "../../components/ScheduleComponents/ScheduleBlock";

const SchedulePage: React.FC = () => {
  const { t } = useTranslation("global");
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const data = await ScheduleService.getSchedules();
    if (data) {
      setSchedules(data);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center">{t("schedule.title")}</h2>
        <Row>
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="custom-bg">
                  <Card.Body>
                    <ScheduleBlock data={schedule} />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>{t("schedule.noSchedules")}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SchedulePage;
