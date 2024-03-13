'use client';
import ReactECharts from 'echarts-for-react';

const EChartTop10IpIdsPie: React.FC<{ data: any[] }> = ({ data }) => {
  // Convert and aggregate data by ipId
  const totalCountByIpId = data.reduce((acc, { ipId }) => {
    if (!acc[ipId]) {
      acc[ipId] = 0;
    }
    acc[ipId]++;
    return acc;
  }, {});

  // Convert the object to an array of [ipId, count] tuples, sort by count in descending order, and take the top 10
  const sortedIpIds = Object.entries(totalCountByIpId as Record<string, number>)
    .sort((a, b) => b[1] - a[1])
    .slice(1, 11);

  // Prepare data for the pie chart
  const pieData = sortedIpIds.map(([ipId, count]) => ({
    name: `${ipId.slice(0, 3)}...${ipId.slice(-3)}`, // Custom label for each slice
    ipId: ipId,
    value: count,
  }));

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
      trigger: 'item',
    },
    series: [
      {
        name: 'Transactions by IP',
        type: 'pie',
        radius: '55%',
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const handleChartClick = (params: any) => {
    window.open(`/ipa/${params.data.ipId}`, '_blank');
  };

  // Define event handlers
  const onEvents = {
    click: handleChartClick,
  };

  return <ReactECharts option={options} onEvents={onEvents} />;
};

export default EChartTop10IpIdsPie;
