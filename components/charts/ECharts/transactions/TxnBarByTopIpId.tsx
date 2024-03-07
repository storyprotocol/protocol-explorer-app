'use client';
import ReactECharts from 'echarts-for-react';

const EChartTop10IpIds: React.FC<{ data: any[] }> = ({ data }) => {
  // Convert and aggregate data by ipId
  const totalCountByIpId = data.reduce((acc, { ipId }) => {
    if (!acc[ipId]) {
      acc[ipId] = 0;
    }
    acc[ipId]++;
    return acc;
  }, {});

  // Convert the object to an array of [ipId, count] tuples, sort by count in descending order, and take the top 10
  const sortedIpIds = Object.entries(totalCountByIpId)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(1, 11);

  // Separate the sorted data into two arrays for the chart
  const ipIds = sortedIpIds.map(([ipId]) => ipId);
  const counts = sortedIpIds.map(([, count]) => count);

  const options = {
    title: {
      text: 'Top 10 IP IDs',
      textStyle: {
        fontWeight: 'normal',
      },
      left: 5,
      top: 5,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ipIds,
      axisLabel: {
        interval: 0,
        rotate: 45,
        formatter: function (value: string | any[]) {
          // Customize the label to show first 3 chars, ..., last 3 chars
          return `${value.slice(0, 3)}...${value.slice(-3)}`;
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: counts,
        type: 'bar',
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default EChartTop10IpIds;
