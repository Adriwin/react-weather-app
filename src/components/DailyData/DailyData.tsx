import type { IDailyData } from '@/types';
import '@/styles/Colors.scss';
import { DailyDataCard } from './DailyDataCard';

export const DailyData = ({ dailyData }: { dailyData: IDailyData[] }) => {
  const today = new Date().toDateString();

  return (
    <>
      <h2 className="custom-gray text-center lg:text-start">Week</h2>
      <div
        className="grid max-h-[45%] grid-cols-2 gap-3 overflow-y-auto
          lg:grid-cols-1 lg:gap-0 2xl:max-h-[55%]"
      >
        {dailyData &&
          dailyData
            .filter((dd) => new Date(dd.dt * 1000).toDateString() !== today)
            .map(({ dt, weather, temp }) => (
              <DailyDataCard
                key={dt}
                timestamp={dt}
                temp={temp.day}
                icon={weather[0].icon}
              />
            ))}
      </div>
    </>
  );
};
