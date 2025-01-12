import React, { useEffect, useState } from "react";
import ChartComponent from "../../components/StatisticComponents/ChartComponent";
import * as echarts from "echarts";
import StatisticService from "../../services/StatisticService";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { Col, Container, Row } from "react-bootstrap";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";
import { useTranslation } from "react-i18next";

const StatisticPage: React.FC = () => {
  const { t } = useTranslation("global");
  const [statistics, setStatistics] = useState<any>(null);

  const fetchStatistics = async () => {
    const response = await StatisticService.getStatistics();
    setStatistics(response);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!statistics || !statistics.aggregatedStatistics) {
    return <p>{t("statistics.loading")}</p>;
  }

  const { precomputedMetrics, aggregatedStatistics } = statistics;

  const labelStyle: any = {
    show: true,
    position: "top",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
    color: "#000",
    fontSize: 12,
    formatter: "{c}",
  };

  const pieLabelStyle: any = {
    show: true,
    position: "outside",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
    color: "#000",
    fontSize: 12,
    formatter: "{b}: {c}",
  };

  // StudyPlans and Sessions
  const totalSessionsData = [
    { name: t("statistics.completed"), value: precomputedMetrics.completedSessions },
    { name: t("statistics.missed"), value: precomputedMetrics.missedSessions },
    { name: t("statistics.inProgress"), value: precomputedMetrics.inProgressSessions },
  ].filter((item) => item.value > 0);

  const totalSessionsOption: echarts.EChartsOption = {
    title: { text: t("statistics.totalSessions") },
    series: [
      {
        type: "pie",
        data: totalSessionsData,
        label: { ...pieLabelStyle },
        labelLine: { show: true },
      },
    ],
  };

  const plansOption: echarts.EChartsOption = {
    title: { text: t("statistics.plansStatus") },
    series: [
      {
        type: "pie",
        data: [
          { name: t("statistics.active"), value: precomputedMetrics.activePlans },
          { name: t("statistics.archived"), value: precomputedMetrics.archivedPlans },
        ],
        label: { ...pieLabelStyle },
        labelLine: { show: true },
      },
    ],
  };

  const timeDistributionByPlanOption: echarts.EChartsOption = {
    title: { text: t("statistics.timeByPlan") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.planName),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.totalTime),
        label: { ...labelStyle, formatter: "{c}h" },
      },
    ],
  };

  const timeDistributionOption: echarts.EChartsOption = {
    title: { text: t("statistics.timeByTopic") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.timeDistribution.map((d: any) => d.topicName),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.timeDistribution.map((d: any) => d.totalTime),
        name: t("statistics.totalTime"),
        label: { ...labelStyle, formatter: "{c}h" },
      },
    ],
  };

  const durationTrendsOption: echarts.EChartsOption = {
    title: { text: t("statistics.durationTrends") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.durationTrends.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        data: aggregatedStatistics.durationTrends.map((d: any) => d.totalActualDuration),
        name: t("statistics.actualStudyTime"),
        label: {
          ...labelStyle,
          formatter: "{c} min",
          position: "top",
        },
        symbol: "circle",
        symbolSize: 8,
        lineStyle: { color: "#5470c6", width: 2 },
      },
    ],
  };

  const progressTowardGoalsOption: echarts.EChartsOption = {
    title: { text: t("statistics.progressTowardGoals") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.planName),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.completionPercentage),
        name: t("statistics.completionPercentage"),
        label: { ...labelStyle, formatter: "{c} %" },
      },
    ],
  };

  const sessionsByDayOption: echarts.EChartsOption = {
    title: { text: t("statistics.sessionsByDay") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsByDay.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsByDay.map((d: any) => d.count),
        name: t("statistics.sessions"),
        label: { ...labelStyle },
      },
    ],
  };

  const sessionsMissedByDayOption: echarts.EChartsOption = {
    title: { text: t("statistics.sessionsMissedByDay") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => d.count),
        name: t("statistics.missedSessions"),
        label: { ...labelStyle },
        itemStyle: { color: "#c23531" },
      },
    ],
  };

  const preferredStudyTimesOption: echarts.EChartsOption = {
    title: { text: t("statistics.preferredStudyTimes") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.preferredStudyTimes.map((d: any) => formatTime(null, d.hour)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.preferredStudyTimes.map((d: any) => d.count),
        name: t("statistics.sessions"),
        label: { ...labelStyle },
      },
    ],
  };

  const quizStatsOption: echarts.EChartsOption = {
    title: { text: t("statistics.quizStats") },
    series: [
      {
        type: "pie",
        data: [
          { name: t("statistics.assigned"), value: precomputedMetrics.assignedQuizCount },
          { name: t("statistics.completed"), value: precomputedMetrics.completedQuizCount },
        ],
        label: { ...pieLabelStyle },
      },
    ],
  };

  const averageScoreOption: echarts.EChartsOption = {
    title: { text: t("statistics.averageScore") },
    series: [
      {
        type: "gauge",
        max: 100,
        data: [{ value: precomputedMetrics.averageQuizScore }],
        detail: { formatter: "{value}%", fontSize: 14 },
      },
    ],
  };

  const quizCompletionsOverTimeOption: echarts.EChartsOption = {
    title: { text: t("statistics.quizCompletionsOverTime") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: t("statistics.completions"),
        type: "line",
        data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) => d.count),
        label: { ...labelStyle },
      },
    ],
  };

  const quizScoreDistributionOption: echarts.EChartsOption = {
    title: { text: t("statistics.quizScoreDistribution") },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.quizScoreDistribution.map((d: any) => d.bucket),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: t("statistics.quizzes"),
        type: "bar",
        data: aggregatedStatistics.quizScoreDistribution.map((d: any) => d.count),
        label: { ...labelStyle },
      },
    ],
  };

  return (
    <>
      <Header />
      <Container fluid className="my-5">
        <Row className="mb-4">
          <Col>
            <h2>{t("statistics.studyPlansAndSessions")}</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={totalSessionsOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={plansOption} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={timeDistributionByPlanOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={timeDistributionOption} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={durationTrendsOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={progressTowardGoalsOption} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={sessionsByDayOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={sessionsMissedByDayOption} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={preferredStudyTimesOption} />
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h2>{t("statistics.quizStatistics")}</h2>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={quizStatsOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={averageScoreOption} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ChartComponent option={quizCompletionsOverTimeOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={quizScoreDistributionOption} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default StatisticPage;
