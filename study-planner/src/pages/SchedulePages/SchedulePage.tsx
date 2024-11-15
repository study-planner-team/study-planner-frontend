import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../components/GeneralComponents/Header";
import Footer from "../../components/GeneralComponents/Footer";
import ScheduleService from "../../services/ScheduleService";
import ScheduleBlock from "../../components/ScheduleComponents/ScheduleBlock";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const data = await ScheduleService.getSchedules();
    console.log(data);
    if (data) {
      setSchedules(data);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center">Harmonogramy</h2>
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
                <p>Brak Harmonogramów :/</p>
              )}
            </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SchedulePage;
