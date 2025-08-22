import type { IHourlyData } from '../../types';

export const HourlyData = ({ hourlyData }: { hourlyData: IHourlyData[] }) => {
  return (
    <>
      {/* Possibly show temeprature on hover */}
      <div className="border-t-2 border-[var(--border-gray)]">
        Hourly diagram of temeparture
      </div>
    </>
  );
};
