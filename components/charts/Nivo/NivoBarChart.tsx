import { calculateOccurrences } from '@/utils/chartUtil';
import { ResponsiveBar } from '@nivo/bar';

// Render the line chart with Nivo
const NivoBarChart: React.FC<{ data: any[] }> = ({ data }) => {
  const transformedData = calculateOccurrences(data, 'actionType');

  console.log({ transformedData });

  return (
    <ResponsiveBar
      data={transformedData}
      colors={{ scheme: 'nivo' }}
      keys={['total']}
      indexBy="actionType"
      margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
      // padding={0.3}
      layout="vertical"
      // colors={{ scheme: 'category10' }}
      // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      // axisTop={null}
      // axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        // tickRotation: -45,
        legend: 'Action Type',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Total',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      // labelSkipWidth={12}
      // labelSkipHeight={12}
      // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      // animate={true}
      // motionStiffness={90}
      // motionDamping={15}
    />
  );
};

export default NivoBarChart;
