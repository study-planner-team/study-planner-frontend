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

  useEffect(() => {
    const fetchStatistics = async () => {
      const response =  await StatisticService.getStatistics(); 
      setStatistics(response);
    };

    fetchStatistics();
  }, []);

  if (!statistics || !statistics.aggregatedStatistics) {
    return <p>Loading...</p>;
  }

  const { precomputedMetrics, aggregatedStatistics } = statistics;
  const totalSessionsData = [
    { name: "Completed", value: precomputedMetrics.completedSessions },
    { name: "Missed", value: precomputedMetrics.missedSessions },
    { name: "In Progress", value: precomputedMetrics.inProgressSessions }
  ].filter(item => item.value > 0);

  const totalSessionsOption: echarts.EChartsOption = {
    title: { text: "Total Completed vs Missed Sessions" },
    series: [
      {
        type: "pie",
        data: totalSessionsData,
        label: {
            show: true, 
            position: "outside",
            formatter: "{b}: {c}",
            fontSize: 12,
            color: "#000"
        },
        labelLine: {
            show: true 
        }
      }
    ]
  };

  const plansOption: echarts.EChartsOption = {
    title: { text: "Active Plans vs Archived Plans" },
    series: [
      {
        type: "pie",
        data: [
          { name: "Active", value: precomputedMetrics.activePlans },
          { name: "Archived", value: precomputedMetrics.archivedPlans }
        ],
        label: {
            show: true, 
            position: "outside", 
            formatter: "{b}: {c}", 
            fontSize: 12,
            color: "#000" 
        },
        labelLine: {
            show: true 
        }
      }
    ]
  };

  const timeDistributionByPlanOption: echarts.EChartsOption = {
    title: {
      text: "Time Distribution by Study Plan (Hours)",
    },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.planName)
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.timeDistributionByPlan.map((d: any) => d.totalTime),
        label: {
            show: true, 
            position: "top", 
            fontSize: 12,
            color: "#000",
            formatter: "{c}h" 
        }
      }
    ]
  };

    const timeDistributionOption: echarts.EChartsOption = {
      title: { text: "Time Distribution by Topics (Hours)" },
      xAxis: {
        type: "category",
        data: aggregatedStatistics.timeDistribution.map((d: any) => d.topicName) as string[]
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "bar",
          data: aggregatedStatistics.timeDistribution.map((d: any) => d.totalTime) as number[],
          name: "Total Time",
          label: {
              show: true, 
              position: "top", 
              fontSize: 12,
              color: "#000",
              formatter: "{c}h"
          }
        }
      ]
    };
  
  const durationTrendsOption: echarts.EChartsOption = {
    title: { 
      text: "Actual Study Time per Day (Minutes)", 
    },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.durationTrends.map((d: any) => formatDate(d.date)),
    },
    yAxis: { 
      type: "value", 
    },
    series: [
      {
        type: "line", 
        data: aggregatedStatistics.durationTrends.map((d: any) => d.totalActualDuration),
        name: "Actual Study Time",
        label: {
          show: true, 
          position: "top",
          formatter: "{c} min"
        },
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#5470c6",
          width: 2
        }
      }
    ]
  };
  
  const progressTowardGoalsOption: echarts.EChartsOption = {
    title: { text: "Progress Toward Goals (%)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.planName) as string[]
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.progressTowardGoals.map((d: any) => d.completionPercentage) as number[],
        name: "Completion %",
        label: {
            show: true,
            position: "top",
            fontSize: 12,
            color: "#000",
            formatter: "{c} %"
        }
      }
    ]
  };

  const sessionsByDayOption: echarts.EChartsOption = {
    title: { text: "Sessions Completed per Day" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsByDay.map((d: any) => formatDate(d.date)) as string[]
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsByDay.map((d: any) => d.count) as number[],
        name: "Sessions",
        label: {
            show: true, 
            position: "top",
            fontSize: 12,
            color: "#000", 
        }
      }
    ]
  };

  const sessionsMissedByDayOption: echarts.EChartsOption = {
    title: {
      text: "Sessions Missed per Day",
    },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => formatDate(d.date))
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.sessionsMissedByDay.map((d: any) => d.count),
        name: "Missed Sessions",
        label: {
          show: true,
          position: "top",
        },
        itemStyle: {
          color: "#c23531"
        }
      }
    ]
  };

  const preferredStudyTimesOption: echarts.EChartsOption = {
    title: { text: "Preferred Study Times (Hour of the Day)" },
    xAxis: {
      type: "category",
      data: aggregatedStatistics.preferredStudyTimes.map((d: any) =>
        formatTime(null, d.hour) 
      ) as string[],
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: aggregatedStatistics.preferredStudyTimes.map((d: any) => d.count) as number[],
        name: "Sessions",
        label: {
            show: true,
            position: "top",
            fontSize: 12,
            color: "#000",
            formatter: "{c}"
        }
      },
    ],
  };
  return (
    <>
    <Header />
        <Container fluid className="my-5">
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
        </Container>
    <Footer />
    </>
  );
};

export default StatisticPage;