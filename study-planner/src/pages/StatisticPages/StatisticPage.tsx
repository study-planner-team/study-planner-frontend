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

  const createChartOption = (title: string, data: any[], series: echarts.SeriesOption, additionalOptions: Partial<echarts.EChartsOption> = {}): echarts.EChartsOption => ({
    title: { text: title },
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: data.length > 0 ? "" : t("statistics.noData"),
        fontSize: 20,
        fill: "#000",
      },
    },
    ...additionalOptions,
    series: [series],
  });

  const totalSessionsOption = createChartOption(
    t("statistics.totalSessions"),
    totalSessionsData,
    {
      type: "pie",
      data: totalSessionsData,
      label: { ...pieLabelStyle },
      labelLine: { show: true },
    }
  );
  
  const plansOption = createChartOption(
    t("statistics.plansStatus"),
    [
      { name: t("statistics.active"), value: precomputedMetrics.activePlans },
      { name: t("statistics.archived"), value: precomputedMetrics.archivedPlans },
    ],
    {
      type: "pie",
      data: [
        { name: t("statistics.active"), value: precomputedMetrics.activePlans },
        { name: t("statistics.archived"), value: precomputedMetrics.archivedPlans },
      ],
      label: { ...pieLabelStyle },
      labelLine: { show: true },
    }
  );
  
  const timeDistributionByPlanOption = createChartOption(
    t("statistics.timeByPlan"),
    aggregatedStatistics.timeDistributionByPlan,
    {
      type: "bar",
      data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.totalTime),
      label: { ...labelStyle, formatter: "{c}h" },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.planName),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const timeDistributionOption = createChartOption(
    t("statistics.timeByTopic"),
    aggregatedStatistics.timeDistribution,
    {
      type: "bar",
      data: aggregatedStatistics.timeDistribution.map((d: any) => d.totalTime),
      name: t("statistics.totalTime"),
      label: { ...labelStyle, formatter: "{c}h" },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.timeDistribution.map((d: any) => d.topicName),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const durationTrendsOption = createChartOption(
    t("statistics.durationTrends"),
    aggregatedStatistics.durationTrends,
    {
      type: "line",
      data: aggregatedStatistics.durationTrends.map((d: any) => d.totalActualDuration),
      name: t("statistics.actualStudyTime"),
      label: { ...labelStyle, formatter: "{c} min", position: "top" },
      symbol: "circle",
      symbolSize: 8,
      lineStyle: { color: "#5470c6", width: 2 },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.durationTrends.map((d: any) => formatDate(d.date)),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const progressTowardGoalsOption = createChartOption(
    t("statistics.progressTowardGoals"),
    aggregatedStatistics.progressTowardGoals,
    {
      type: "bar",
      data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.completionPercentage),
      name: t("statistics.completionPercentage"),
      label: { ...labelStyle, formatter: "{c} %" },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.planName),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const sessionsByDayOption = createChartOption(
    t("statistics.sessionsByDay"),
    aggregatedStatistics.sessionsByDay,
    {
      type: "bar",
      data: aggregatedStatistics.sessionsByDay.map((d: any) => d.count),
      name: t("statistics.sessions"),
      label: { ...labelStyle },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.sessionsByDay.map((d: any) => formatDate(d.date)),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const sessionsMissedByDayOption = createChartOption(
    t("statistics.sessionsMissedByDay"),
    aggregatedStatistics.sessionsMissedByDay,
    {
      type: "bar",
      data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => d.count),
      name: t("statistics.missedSessions"),
      label: { ...labelStyle },
      itemStyle: { color: "#c23531" },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => formatDate(d.date)),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const preferredStudyTimesOption = createChartOption(
    t("statistics.preferredStudyTimes"),
    aggregatedStatistics.preferredStudyTimes,
    {
      type: "bar",
      data: aggregatedStatistics.preferredStudyTimes.map((d: any) => d.count),
      name: t("statistics.sessions"),
      label: { ...labelStyle },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.preferredStudyTimes.map((d: any) => formatTime(null, d.hour)),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const quizStatsOption = createChartOption(
    t("statistics.quizStats"),
    [
      { name: t("statistics.assigned"), value: precomputedMetrics.assignedQuizCount },
      { name: t("statistics.completed"), value: precomputedMetrics.completedQuizCount },
    ],
    {
      type: "pie",
      data: [
        { name: t("statistics.assigned"), value: precomputedMetrics.assignedQuizCount },
        { name: t("statistics.completed"), value: precomputedMetrics.completedQuizCount },
      ],
      label: { ...pieLabelStyle },
    }
  );
  
  const averageScoreOption = createChartOption(
    t("statistics.averageScore"),
    [precomputedMetrics.averageQuizScore],
    {
      type: "gauge",
      max: 100,
      data: [{ value: precomputedMetrics.averageQuizScore }],
      detail: { formatter: "{value}%", fontSize: 14 },
    }
  );
  
  const quizCompletionsOverTimeOption = createChartOption(
    t("statistics.quizCompletionsOverTime"),
    aggregatedStatistics.quizCompletionsOverTime,
    {
      type: "line",
      data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) => d.count),
      name: t("statistics.completions"),
      label: { ...labelStyle },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.quizCompletionsOverTime.map((d: any) => formatDate(d.date)),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );
  
  const quizScoreDistributionOption = createChartOption(
    t("statistics.quizScoreDistribution"),
    aggregatedStatistics.quizScoreDistribution,
    {
      type: "bar",
      data: aggregatedStatistics.quizScoreDistribution.map((d: any) => d.count),
      name: t("statistics.quizzes"),
      label: { ...labelStyle },
    },
    {
      xAxis: {
        type: "category",
        data: aggregatedStatistics.quizScoreDistribution.map((d: any) => d.bucket),
        axisLabel: { show: true, interval: 0, rotate: 45 },
      },
      yAxis: { type: "value" },
    }
  );

  return (
    <>
      <Header />
      <Container fluid className="my-5">
        <Row>
          <Col>
            <h2>{t("statistics.studyPlansAndSessions")}</h2>
            <hr />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <ChartComponent option={totalSessionsOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={plansOption} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <ChartComponent option={timeDistributionByPlanOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={timeDistributionOption} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <ChartComponent option={durationTrendsOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={progressTowardGoalsOption} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <ChartComponent option={sessionsByDayOption} />
          </Col>
          <Col md={6}>
            <ChartComponent option={sessionsMissedByDayOption} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <ChartComponent option={preferredStudyTimesOption} />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h2>{t("statistics.quizStatistics")}</h2>
            <hr />
          </Col>
        </Row>
        <Row className="mb-4">
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
