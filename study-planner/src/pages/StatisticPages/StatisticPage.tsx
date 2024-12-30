import React, { useEffect, useState } from "react";
import ChartComponent from "../../components/StatisticComponents/ChartComponent";
import * as echarts from "echarts";
import StatisticService from "../../services/StatisticService";
import Footer from "../../components/GeneralComponents/Footer";
import Header from "../../components/GeneralComponents/Header";
import { Col, Container, Row } from "react-bootstrap";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";

const StatisticPage: React.FC = () => {
  const [statistics, setStatistics] = useState<any>(null);

  const fetchStatistics = async () => {
    const response =  await StatisticService.getStatistics(); 
    setStatistics(response);
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!statistics || !statistics.aggregatedStatistics) {
    return <p>Loading...</p>;
  }

  const { precomputedMetrics, aggregatedStatistics } = statistics;

  const labelStyle: any  = {
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

  const pieLabelStyle: any  = {
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
    { name: "Completed", value: precomputedMetrics.completedSessions },
    { name: "Missed", value: precomputedMetrics.missedSessions },
    { name: "In Progress", value: precomputedMetrics.inProgressSessions },
  ].filter((item) => item.value > 0);

  const totalSessionsOption: echarts.EChartsOption = {
    title: { text: "Total Completed vs. Missed Sessions" },
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
    title: { text: "Active Plans vs. Archived Plans" },
    series: [
      {
        type: "pie",
        data: [
          { name: "Active", value: precomputedMetrics.activePlans },
          { name: "Archived", value: precomputedMetrics.archivedPlans },
        ],
        label: { ...pieLabelStyle },
        labelLine: { show: true },
      },
    ],
  };

  const timeDistributionByPlanOption: echarts.EChartsOption = {
    title: { text: "Time Distribution by Study Plan (Hours)" },
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
    title: { text: "Time Distribution by Topics (Hours)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.timeDistribution.map((d: any) => d.topicName),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.timeDistribution.map((d: any) => d.totalTime),
        name: "Total Time",
        label: { ...labelStyle, formatter: "{c}h" },
      },
    ],
  };

  const durationTrendsOption: echarts.EChartsOption = {
    title: { text: "Actual Study Time per Day (Minutes)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.durationTrends.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        data: aggregatedStatistics.durationTrends.map((d: any) => d.totalActualDuration),
        name: "Actual Study Time",
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
    title: { text: "Progress Toward Goals (%)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.planName),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.completionPercentage),
        name: "Completion %",
        label: { ...labelStyle, formatter: "{c} %" },
      },
    ],
  };

  const sessionsByDayOption: echarts.EChartsOption = {
    title: { text: "Sessions Completed per Day" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsByDay.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsByDay.map((d: any) => d.count),
        name: "Sessions",
        label: { ...labelStyle },
      },
    ],
  };

  const sessionsMissedByDayOption: echarts.EChartsOption = {
    title: { text: "Sessions Missed per Day" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => formatDate(d.date)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => d.count),
        name: "Missed Sessions",
        label: { ...labelStyle },
        itemStyle: { color: "#c23531" },
      },
    ],
  };

  const preferredStudyTimesOption: echarts.EChartsOption = {
    title: { text: "Preferred Study Times (Hour of the Day)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.preferredStudyTimes.map((d: any) => formatTime(null, d.hour)),
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.preferredStudyTimes.map((d: any) => d.count),
        name: "Sessions",
        label: { ...labelStyle },
      },
    ],
  };

  // Quiz
  const quizStatsData = [
    { name: "Assigned", value: precomputedMetrics.assignedQuizCount },
    { name: "Completed", value: precomputedMetrics.completedQuizCount },
  ];

  const quizStatsOption: echarts.EChartsOption = {
    title: { text: "Quizzes Assigned vs. Completed" },
    series: [
      {
        type: "pie",
        data: quizStatsData,
        label: { ...pieLabelStyle },
      },
    ],
  };

  const averageScoreOption: echarts.EChartsOption = {
    title: { text: "Average Quiz Score (%)" },
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
    title: { text: "Quiz Completions Over Time" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) =>
        formatDate(d.date)
      ),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Completions",
        type: "line",
        data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) => d.count),
        label: { ...labelStyle },
      },
    ],
  };

  const quizScoreDistributionOption: echarts.EChartsOption = {
    title: { text: "Quiz Score Distribution" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.quizScoreDistribution.map((d: any) => d.bucket),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Quizzes",
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
            <h2>Study Plans and Sessions</h2>
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
            <h2>Quiz Statistics</h2>
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