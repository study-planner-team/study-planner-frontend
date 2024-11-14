import React from 'react';
import { Card } from 'react-bootstrap';

interface FeatureCardProps {
  title: string;
  text: string;
  imageUrl: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, imageUrl }) => {
  return (
    <Card className="bg-light text-dark mb-4 h-100" id="showcase-card">
      <Card.Img variant="top" src={imageUrl} className='h-75 p-2'/>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="flex-grow-1">{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeatureCard;