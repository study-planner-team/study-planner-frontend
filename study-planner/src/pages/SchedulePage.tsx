import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScheduleService from "../services/ScheduleService";

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await ScheduleService.getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Couldn't get schedules", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center">Harmonogramy</h2>
            <Row>
              {schedules.length > 0 ? (
                schedules.map((schedule) => (
                  <Col md={3} key={schedule.scheduleId} className="mb-4">
                    <Card className="custom-bg">
                      <Card.Body>
                        <Card.Title>{schedule.title}</Card.Title>
                        <Card.Text>Zawartość Harmonogramu</Card.Text>
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
