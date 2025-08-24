import type { IDailyData } from '@/types';
import '@/styles/Colors.scss';
import { DailyDataCard } from './DailyDataCard';

export const DailyData = ({ dailyData }: { dailyData: IDailyData[] }) => {
  const today = new Date().toDateString();

  return (
    <>
      <h2 className="custom-gray">Week</h2>
      <div>
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
