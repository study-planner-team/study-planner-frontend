import React, { useState, useEffect } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
import BadgeService from "../../services/BadgeService";
import { useTranslation } from "react-i18next";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";

const PublicUsersPage: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const isPolish = i18n.language === "pol";

  useEffect(() => {
    fetchUsersWithBadges();
  }, [i18n.language]);

  // Helper method to translate badge descriptions
  const translateBadgeDescriptions = (users: any[]) => {
    return users.map((user) => ({...user, badges: user.badges.map((badge: any) => ({
        ...badge, description: isPolish
          ? t(`badges.${badge.badgeId}`, badge.description)
          : badge.description,
      })),
    }));
  };

  const fetchUsersWithBadges = async () => {
    const response = await BadgeService.fetchPublicUsersWithBadges();
    if (response) {
      const translatedUsers = translateBadgeDescriptions(response);
      setAllUsers(translatedUsers);
      setFilteredUsers(translatedUsers);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = allUsers.filter(user =>
      user.username.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">{t("publicUsers.title")}</h2>
            <div className="d-flex justify-content-center mb-4">
            <Form.Control
                type="text"
                placeholder={t("publicUsers.searchPlaceholder")}
                className="w-25 text-center"
                onChange={handleFilter}
            />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <div className="custom-line"></div>
            </div>
          </Col>
        </Row>
        
        <Row className="gy-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Col md={3} sm={6} key={user.userId} className="text-center">
                <div className="p-3 border rounded shadow-sm bg-light">
                  <h5 className="mb-3 text-truncate">{user.username}</h5>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    {user.badges.length > 0 ? (
                      user.badges.map((badge: any) => (
                        <OverlayTrigger
                          key={badge.badgeId}
                          placement="bottom"
                          overlay={
                            <Tooltip id={`tooltip-${badge.badgeId}`}>
                              <strong>{badge.title}</strong>
                              <div>{badge.description}</div>
                            </Tooltip>
                          }
                        >
                          <img
                            src={badge.iconPath}
                            alt={badge.title}
                            className="img-fluid"
                            style={{
                              width: "40px",
                              height: "40px",
                              cursor: "pointer",
                            }}
                          />
                        </OverlayTrigger>
                      ))
                    ) : (
                      <p className="text-muted">{t("badges.noBadges")}</p>
                    )}
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center">{t("publicUsers.noUsers")}</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PublicUsersPage;
