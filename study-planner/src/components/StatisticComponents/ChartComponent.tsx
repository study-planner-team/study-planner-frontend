import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface ChartComponentProps {
  option: echarts.EChartsOption;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ option}) => {
    const chartRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (chartRef.current && option) {
        const chartInstance = echarts.init(chartRef.current);
        chartInstance.setOption(option);
  
        window.addEventListener("resize", () => chartInstance.resize());
        return () => chartInstance.dispose();
      }
    }, [option]);
  
    return <div ref={chartRef} style={{ width: "100%", height: "300px"}} />;
  };

export default ChartComponent;