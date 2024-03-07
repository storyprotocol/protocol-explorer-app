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
  // Convert and aggregate data by hour
  const transactionsPerHour = data.reduce<Record<string, number>>((acc, { createdAt }) => {
    // Convert UNIX timestamp to a date-time string including the hour
    const date = new Date(parseInt(createdAt) * 1000);
    const dateHour = date.toISOString().split(':00:00.')[0]; // Format: YYYY-MM-DDTHH
    if (!acc[dateHour]) {
      acc[dateHour] = 0;
    }
    acc[dateHour]++;
    return acc;
  }, {});

  // Sort hours and calculate cumulative sum
  const sortedHours = Object.keys(transactionsPerHour).sort();
  const cumulativeCounts = sortedHours.reduce<number[]>((acc, hour, index) => {
    if (index === 0) {
      acc.push(transactionsPerHour[hour]);
    } else {
      acc.push(acc[index - 1] + transactionsPerHour[hour]);
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
      data: sortedHours,
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
