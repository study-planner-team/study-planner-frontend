import React, { useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface BadgeProps {
    badge: {
        badgeId: number;
        title: string;
        iconPath: string;
        earned: boolean;
        description: string;
    };
}

const BadgeDisplay: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id={`tooltip-${badge.badgeId}`}>{badge.description}</Tooltip>
      }
    >
      <div className={`badge d-flex flex-column align-items-center m-3`}>
        <img
          src={badge.iconPath}
          alt={badge.title}
          className={`img-fluid ${badge.earned ? "" : "opacity-50 grayscale"}`}
          style={{ width: "80px", height: "80px" }}
        />
        <p
          className={`mt-2 text-center fw-bold text-dark`}
          style={{
            backgroundColor: badge.earned ? "#ffc107" : "transparent",
            borderRadius: "5px",
            padding: "5px 8px",
          }}
        >
          {badge.title}
        </p>
      </div>
    </OverlayTrigger>
  );
};

export default BadgeDisplay;