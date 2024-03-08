'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

const LicensesByPolicyId: React.FC<{ data: any[] }> = ({ data }) => {
  const policyIdCounts = data.reduce((acc, { policyId }) => {
    acc[policyId] = (acc[policyId] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(policyIdCounts).map(([name, value]) => ({ name, value }));

  const getOption = () => ({
    title: {
      text: 'Licenses by Policy ID',
      textStyle: {
        fontWeight: 'normal',
      },
      left: 5,
      top: 5,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        data: chartData,
      },
    ],
  });

  return <ReactECharts option={getOption()} />;
};

export default LicensesByPolicyId;
