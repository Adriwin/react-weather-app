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
import '@/assets/scss/Colors.scss';
import { WeatherIcon } from '@/components/WeatherIcon/WeatherIcon';

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

interface IChartKeyArgs {
  index: number;
  hData: IHourlyData;
}

const CustomTooltip = ({ active, payload }: ITooltipContent) => {
  if (!payload?.length) return;

  const isVisible = active && payload && payload.length;

  const content = payload[0];

  if (isEmpty(content.payload) || !content.payload) return;

  // weekday,time,icon,description,temp
  const splittedContent = content.payload.chartKey.split(',');

  return (
    <div
      className="rounded-md bg-white p-1 opacity-90"
      style={{
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {isVisible && (
        <div className="flex flex-row">
          <div className="flex flex-col">
            <>
              <p className="text-lg font-medium">{splittedContent[0]},</p>
              <p className="custom-gray !mb-0">{splittedContent[1]}</p>
              <p className="text-2xl font-medium">
                {Math.round(Number(splittedContent[4]))}°C
              </p>
            </>
            <p className="capitalize">{splittedContent[3]}</p>
          </div>
          <WeatherIcon className="size-20" icon={splittedContent[2]} />
        </div>
      )}
    </div>
  );
};

const CustomizedXAxisTick = ({ x, y, payload }: ITickContent) => {
  if (isEmpty(payload) || !payload) return;
  if (!payload?.value) return;

  // weekday,time,icon,description,temp
  const splittedPayload = payload.value.split(',');

  return (
    <g>
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} textAnchor="middle">
          {splittedPayload[0]}
        </text>
        <text x={0} y={20} textAnchor="middle">
          {splittedPayload[1]}
        </text>
      </g>
    </g>
  );
};

export const HourlyData = ({ hourlyData }: { hourlyData: IHourlyData[] }) => {
  const MAX_HOURS_PER_PAGE = 7;

  const chartData: IChartData[] = [];

  const getChartKey = ({ index, hData }: IChartKeyArgs): string => {
    const hDataIcon = hData.weather[0].icon;
    const hDataDescription = hData.weather[0].description;
    const hDataTemp = hData.temp;
    const splittedDateTime = (
      getSimpleDateFromTimestamp(hData.dt, {
        weekday: 'short',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }) as string
    ).split(' ');
    let weekday = splittedDateTime[0];
    if (index === 0) weekday = 'Today';
    return `${weekday},${splittedDateTime[1]},${hDataIcon},${hDataDescription},${hDataTemp}`;
  };

  hourlyData.forEach((hData, index) => {
    chartData.push({
      chartKey: getChartKey({ index, hData }), // weekday,time,icon,description,temp
      chartValue: Math.round(hData.temp),
    });
  });

  const width =
    chartData.length * 100 < MAX_HOURS_PER_PAGE
      ? MAX_HOURS_PER_PAGE
      : chartData.length * 100;

  return (
    <div
      className="hidden h-[38vh] overflow-x-auto overflow-y-hidden border-t-2
        border-[var(--border-gray)] pt-6 lg:block 2xl:h-[45vh]"
    >
      <ResponsiveContainer width={width} height="100%">
        <LineChart
          accessibilityLayer
          data={chartData}
          className="turn-off-focus-outline"
        >
          <XAxis
            dataKey="chartKey"
            tickLine={false}
            axisLine={false}
            tickMargin={0}
            minTickGap={0}
            interval={0}
            tick={<CustomizedXAxisTick />}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickSize={1}
            width={35}
            tick={false}
          />
          <Tooltip cursor={false} offset={-160} content={<CustomTooltip />} />
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
