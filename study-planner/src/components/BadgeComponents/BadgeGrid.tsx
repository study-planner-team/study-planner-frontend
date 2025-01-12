import React, { useEffect, useState } from 'react';
import BadgeDisplay from './BadgeDisplay';
import { Container, Row, Col } from 'react-bootstrap';
import BadgeService from '../../services/BadgeService';

interface Badge {
    badgeId: number;
    title: string;
    iconPath: string;
    earned: boolean;
    description: string;
}

const BadgeGrid: React.FC<{ userId: number }> = ({ userId }) => {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBadges = async () => {
            const data = await BadgeService.fetchUserBadges(userId);
            if (data) setBadges(data);
            setLoading(false);
        };

        fetchBadges();
    }, [userId]);

    if (loading) {
        return <p>Loading badges...</p>;
    }

    const sortedBadges = [...badges].sort((a, b) => Number(b.earned) - Number(a.earned));

    return (
        <Container className="badge-grid" fluid>
            <Row>
                {sortedBadges.map((badge) => (
                    <Col key={badge.badgeId} xs={6} sm={4} md={6} lg={4}>
                        <BadgeDisplay badge={badge} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BadgeGrid;