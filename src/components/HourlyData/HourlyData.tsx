import type { IHourlyData } from '../../types';

export const HourlyData = ({ hourlyData }: { hourlyData: IHourlyData[] }) => {
  return (
    <>
      {/* Possibly show temeprature on hover */}
      <div>Hourly diagram of temeparture</div>
    </>
  );
};
