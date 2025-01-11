import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translations
import usePermissions from "../../hooks/usePermissions";

interface StudyPlanCardProps {
  plan: {
    studyPlanId: number;
    title: string;
    progress: number;
    description?: string;
  };
  onActionClick: () => void;
  actionLabel: string;
  actionVariant: "warning" | "danger";
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  onActionClick,
  actionLabel,
  actionVariant,
}) => {
  const { t } = useTranslation("global");
  const { canViewDetails } = usePermissions(plan);

  return (
    <Card className="custom-bg mb-4">
      <Card.Body>
        <Card.Title>{plan.title}</Card.Title>
        {plan.description && <Card.Text>{plan.description}</Card.Text>}
        <Card.Text>
          {t("studyPlans.progress")}: {plan.progress}%
        </Card.Text>
        {canViewDetails && (
          <Link
            to={`/studyplans/${plan.studyPlanId}`}
            className="text-center custom-margin"
          >
            <Button variant="warning">{t("studyPlans.details")}</Button>
          </Link>
        )}
        <Button variant={actionVariant} onClick={onActionClick}>
          {actionLabel}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StudyPlanCard;
