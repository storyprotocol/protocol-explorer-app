'use client';
import ReactECharts from 'echarts-for-react';

const EChartBarByActionType: React.FC<{ data: any[] }> = ({ data }) => {
  console.log({ data });

  // Convert and aggregate data by resourceType
  const totalCountByResourceType = data.reduce((acc, { resourceType }) => {
    if (!acc[resourceType]) {
      acc[resourceType] = 0;
    }
    acc[resourceType]++;
    return acc;
  }, {});

  // Prepare data for the chart
  const resourceTypes = Object.keys(totalCountByResourceType);
  const counts = resourceTypes.map((type) => totalCountByResourceType[type]);

  const options = {
    title: {
      text: 'Transactions Types',
      textStyle: {
        fontWeight: 'normal',
      },
      left: 5,
      top: 5,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow', // 'shadow' as the tooltip trigger
      },
    },
    xAxis: {
      type: 'category',
      data: resourceTypes,
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

export default EChartBarByActionType;
