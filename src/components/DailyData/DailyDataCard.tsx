import {
  getSimpleDateFromTimestamp,
  getDayOfTheWeekFromTimestamp,
} from '@/utils';

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
    <div className="bg-white opacity-50 rounded-lg mb-6 p-3 shadow-md">
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
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather-icon"
        />
      </div>
    </div>
  );
};
