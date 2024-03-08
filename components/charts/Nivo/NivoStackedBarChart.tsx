import { groupAndCalculateTotal } from '@/utils/chartUtil';
import { BarDatum, ResponsiveBar } from '@nivo/bar';

// Render the line chart with Nivo
const MyStackedBar: React.FC<{ data: any[] }> = ({ data }) => {
  const { keys, index, results: transformedData } = groupAndCalculateTotal(data, 'actionType', 'resourceType');

  console.log({ transformedData, keys, index });

  return (
    <ResponsiveBar
      data={transformedData as BarDatum[]}
      keys={keys}
      indexBy={index}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      layout="vertical"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#e91e63', '#03a9f4', '#ff9800', '#4caf50', '#2196f3', '#9c27b0', '#ffeb3b', '#795548', '#607d8b']}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Action Type',
        legendPosition: 'middle',
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Total',
        legendPosition: 'middle',
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      gridYValues={5}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
    />
  );
};

export default MyStackedBar;
