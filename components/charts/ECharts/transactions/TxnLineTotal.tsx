'use client';
import React from 'react';
import ReactECharts, { EChartsOption } from 'echarts-for-react';

// Define a type for the data items
interface DataItem {
  createdAt: string; // Assuming createdAt is always a string in your data
  // Add other properties as needed
}

interface EChartLineTotalTxnProps {
  data: DataItem[];
}

const EChartLineTotalTxn: React.FC<EChartLineTotalTxnProps> = ({ data }) => {
  // Convert and aggregate data by day
  const transactionsPerDay = data.reduce<Record<string, number>>((acc, { createdAt }) => {
    // Convert UNIX timestamp to a date string
    const date = new Date(parseInt(createdAt) * 1000);
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    if (!acc[dateString]) {
      acc[dateString] = 0;
    }
    acc[dateString]++;
    return acc;
  }, {});

  // Sort days and calculate cumulative sum
  const sortedDays = Object.keys(transactionsPerDay).sort();
  const cumulativeCounts = sortedDays.reduce<number[]>((acc, day, index) => {
    if (index === 0) {
      acc.push(transactionsPerDay[day]);
    } else {
      acc.push(acc[index - 1] + transactionsPerDay[day]);
    }
    return acc;
  }, []);

  const options: EChartsOption = {
    title: {
      text: 'Total Transactions',
      textStyle: {
        fontWeight: 'normal',
      },
      left: 5,
      top: 5,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: sortedDays,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: cumulativeCounts,
        type: 'line',
        smooth: true,
        areaStyle: {}, // Optional: Adds shading under the line for visual emphasis on accumulation
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default EChartLineTotalTxn;
