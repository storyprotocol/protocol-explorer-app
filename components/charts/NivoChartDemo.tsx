'use client';
import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import CardContainer from '../cards/CardContainer';

function extractFormattedData(obj: any) {
  if (obj && obj.points && obj.points.length > 0) {
    const point = obj.points[0]; // Get the first point

    if (point.data && point.data.xFormatted && point.data.yFormatted) {
      const xFormatted = point.data.xFormatted;
      const yFormatted = point.data.yFormatted;

      return { xFormatted, yFormatted };
    }
  }

  return null; // Return null if the data is not in the expected format
}

const NivoChartDemo = ({ data }: { data: Array<any> }) => {
  // Prepare and format data (grouped by hourly)

  const [current, setCurrent] = useState<{ xFormatted: any; yFormatted: any } | undefined | null>();
  const hourlyData = data.reduce((acc, entry) => {
    const date = new Date(entry.createdAt);
    const hour = date.getHours();
    const formattedDate = `${date.toISOString().split('T')[0]} ${hour}:00:00`;

    if (!acc[formattedDate]) {
      acc[formattedDate] = 0;
    }

    acc[formattedDate]++;

    return acc;
  }, {});

  const chartData = Object.keys(hourlyData).map((date) => ({
    x: date,
    y: hourlyData[date],
  }));

  // Define a custom theme with adjusted font sizes for both x-axis and y-axis tick labels
  const customTheme = {
    background: '#ffffff',
    text: {
      fontSize: 14,
      fill: '#333333',
      outlineWidth: 0,
      outlineColor: 'transparent',
    },
    axis: {
      domain: {
        line: {
          // stroke: '#7  77777',
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          // fill: '#333333',
          // outlineWidth: 0,
          // outlineColor: 'transparent',
        },
      },
      ticks: {
        line: {
          stroke: '#fff',
          // strokeWidth: 1,
        },
        text: {
          fontSize: 14,
          fill: '#999',
          outlineWidth: 0,
          outlineColor: 'transparent',
        },
      },
    },
    grid: {
      line: {
        stroke: '#dddddd',
        strokeWidth: 1,
      },
    },
    legends: {
      title: {
        text: {
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent',
        },
      },
      text: {
        fill: '#333333',
        outlineWidth: 0,
        outlineColor: 'transparent',
      },
      ticks: {
        line: {},
        text: {
          fill: '#333333',
          outlineWidth: 0,
          outlineColor: 'transparent',
        },
      },
    },
    annotations: {
      text: {
        fill: '#333333',
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1,
      },
      link: {
        stroke: '#000000',
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1,
      },
      outline: {
        stroke: '#000000',
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1,
      },
      symbol: {
        fill: '#000000',
        outlineWidth: 2,
        outlineColor: '#ffffff',
        outlineOpacity: 1,
      },
    },
    tooltip: {
      container: {
        background: '#ffffff',
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
  };

  chartData.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  // Calculate 4 evenly spaced tick positions
  // const xTicks = calculateEvenlySpacedTicks(chartData, 4);

  // function calculateEvenlySpacedTicks(data: any, count: number) {
  //   const step = Math.ceil(data.length / count);
  //   const ticks = [data[0].x];
  //   for (let i = 1; i < count - 1; i++) {
  //     const index = i * step;
  //     ticks.push(data[index].x);
  //   }
  //   ticks.push(data[data.length - 1].x);
  //   return ticks;
  // }

  return (
    <CardContainer className="pb-10">
      <div className="absolute top-6 left-6 z-20 ">
        <h1 className="text-xl ">Transactions </h1>

        {current ? (
          <div className="flex flex-col">
            <div className="font-semibold">{current.yFormatted} txns</div>
            <div>{current.xFormatted}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveLine
          data={[
            {
              id: 'Txns',
              data: chartData,
            },
          ]}
          lineWidth={3}
          pointSize={10}
          margin={{ top: 50, right: 50, bottom: 80, left: 50 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d %H:%M:%S',
          }}
          xFormat="time:%Y-%m-%d %H:%M:%S"
          useMesh
          axisBottom={{
            format: '%b %d',
            // legend: 'time scale',
            tickRotation: -80,
            legendOffset: -12,
            tickValues: 'every 2 days',
          }}
          axisRight={{
            tickValues: 3,
            // legendOffset: 12,
          }}
          axisLeft={{ tickValues: 0 }}
          onMouseEnter={(e) => {
            setCurrent(extractFormattedData(e));
          }}
          curve="linear"
          enableSlices="x"
          enablePoints={false}
          enableGridX={false}
          enableGridY={true}
          colors={['#a5b4fc']}
          theme={customTheme}
        />
      </div>
    </CardContainer>
  );
};

export default NivoChartDemo;
