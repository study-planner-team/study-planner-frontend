import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation("global");

  const isPolish = i18n.language === 'pol'; // Adjust for other Polish codes if needed
  console.log('Is Polish:', isPolish);

  // Fetch the translated description or fallback to English description
  const translatedDescription = t(`badges.${badge.badgeId}`, '');
  console.log(`Translation for badge ${badge.badgeId}:`, translatedDescription);

  const description = isPolish
    ? translatedDescription || badge.description // Fallback if translation is missing
    : badge.description;

  console.log('Final Description:', description);
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id={`tooltip-${badge.badgeId}`}>{description}</Tooltip>
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
