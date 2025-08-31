import {
  getSimpleDateFromTimestamp,
  getDayOfTheWeekFromTimestamp,
} from '@/utils';
import { WeatherIcon } from '@/components/WeatherIcon/WeatherIcon';

export const DailyDataCard = ({
  timestamp,
  temp,
  icon,
}: {
  timestamp: number;
  temp: number;
  icon: string;
}) => {
  return (
    <div
      className="mb-6 rounded-lg bg-[rgba(255,255,255,50)] p-3 shadow-md
        max-lg:text-start"
    >
      <p className="text-lg font-medium">
        {getDayOfTheWeekFromTimestamp(timestamp)},
      </p>
      <div className="flex flex-row justify-between">
        <div className="">
          <p className="custom-gray">
            {getSimpleDateFromTimestamp(timestamp, {
              day: 'numeric',
              month: 'numeric',
            })}
          </p>
          <p className="text-3xl font-medium">{Math.round(temp)}°C</p>
        </div>
        <WeatherIcon icon={icon} />
      </div>
    </div>
  );
};
