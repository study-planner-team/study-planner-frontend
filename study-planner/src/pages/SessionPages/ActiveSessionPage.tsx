import React, { useEffect, useState } from "react";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { Col, Row } from "react-bootstrap";
import FinishedSessionBlock from "../../components/SessionComponents/FinishedSessionsBlock";
import CurrentSessionCard from "../../components/SessionComponents/CurrentSessionCard";
import UpcomingSessionCard from "../../components/SessionComponents/UpcomingSessionCard";

const ActiveSessionPage: React.FC = () => {
  return (
    <>
      <Header />
      <Row>
        <Col><FinishedSessionBlock/></Col>
        <Col><CurrentSessionCard/></Col>
        <Col><UpcomingSessionCard/></Col>
      </Row>
      <Footer />
    </>
  );
};

export default ActiveSessionPage;