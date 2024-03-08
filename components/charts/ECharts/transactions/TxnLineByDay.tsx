'use client';
import ReactECharts from 'echarts-for-react';

const EChartLineTxnByDay: React.FC<{ data: any[] }> = ({ data }) => {
  // Convert and aggregate data by day
  const transactionsPerDay = data.reduce((acc, { createdAt }) => {
    // Convert UNIX timestamp to a date string (YYYY-MM-DD)
    const date = new Date(parseInt(createdAt) * 1000);
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    if (!acc[dateString]) {
      acc[dateString] = 0;
    }
    acc[dateString]++;
    return acc;
  }, {});

  // Prepare data for the chart
  const days = Object.keys(transactionsPerDay).sort();
  const counts = days.map((day) => transactionsPerDay[day]);

  const options = {
    title: {
      text: 'Transactions by Day',
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
      type: 'category',
      data: days,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: counts,
        type: 'line',
        // smooth: true,
      },
    ],
    legend: { display: false },
  };

  return <ReactECharts option={options} />;
};

export default EChartLineTxnByDay;
