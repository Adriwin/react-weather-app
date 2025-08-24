import { getSimpleDateFromTimestamp } from '@/utils';
import type { IHourlyData } from '@/types';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import '@/components/HourlyData/HourlyData.scss';
import { isEmpty } from 'lodash';

interface IChartData {
  chartKey: string;
  chartValue: number;
}

interface ITooltipContent {
  active?: boolean;
  payload?: {
    value: string | number;
    payload: {
      chartKey: string;
      chartValue: number;
    };
  }[];
  label?: string;
}

interface ITickContent {
  x?: number;
  y?: number;
  payload?: {
    value?: string;
  };
}

const CustomTooltip = ({ active, payload }: ITooltipContent) => {
  if (!payload?.length) return;

  const isVisible = active && payload && payload.length;

  const content = payload[0];

  if (isEmpty(content.payload) || !content.payload) return;

  // date,icon
  const splittedContent = content.payload.chartKey.split(',');

  // TODO: add description from weather[0]
  return (
    <div
      className="bg-white opacity-90 rounded-md p-1"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {isVisible && (
        <>
          <p className="font-medium text-lg">{splittedContent[0]}</p>
          <img
            src={`https://openweathermap.org/img/wn/${splittedContent[1]}@2x.png`}
            alt="weather-icon"
          />
        </>
      )}
    </div>
  );
};

const CustomizedXAxisTick = ({ x, y, payload }: ITickContent) => {
  // console.log(payload);
  if (isEmpty(payload) || !payload) return;
  if (!payload?.value) return;
  // date,icon
  const splittedPayload = payload.value.split(',');
  const splittedDate = splittedPayload[0].split(' ');
  // somehow make this text in a column
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle">
        {splittedDate[0]}
        <br />
        {splittedDate[1]}
      </text>
    </g>
  );
};

export const HourlyData = ({ hourlyData }: { hourlyData: IHourlyData[] }) => {
  const MAX_HOURS_PER_PAGE = 7;

  const chartData: IChartData[] = [];

  hourlyData.forEach((hData, index) => {
    const hDataIcon = hData.weather[0].icon;
    let chartKey = `${
      getSimpleDateFromTimestamp(hData.dt, {
        weekday: 'short',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }) as string
    },${hDataIcon}`;
    if (index === 0) chartKey = `NOW,${hDataIcon}`;
    chartData.push({
      chartKey,
      chartValue: Math.round(hData.temp),
    });
  });

  console.log(chartData);

  const width =
    chartData.length * 100 < MAX_HOURS_PER_PAGE
      ? MAX_HOURS_PER_PAGE
      : chartData.length * 100;

  return (
    <div className="pt-6 min-h-[10%] max-h-[55%] border-t-2 border-[var(--border-gray)] overflow-x-auto overflow-y-hidden">
      <ResponsiveContainer width={width} height={350}>
        <LineChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="chartKey"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={0}
            height={100}
            tick={<CustomizedXAxisTick />}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickSize={1}
            width={35}
            tick={false}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Line
            className="line-shadow"
            dataKey="chartValue"
            type="natural"
            stroke="#000000"
            strokeWidth={5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
