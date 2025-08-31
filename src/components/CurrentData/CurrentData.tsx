import type { ICurrentData } from '@/types';
import '@/assets/scss/Colors.scss';
import { getSimpleDateFromTimestamp } from '@/utils';
import { WeatherIcon } from '@/components/WeatherIcon/WeatherIcon';

export const CurrentData = ({ currentData }: { currentData: ICurrentData }) => {
  return (
    <>
      <h2 className="custom-gray text-center lg:text-start">Today</h2>
      <div className="flex flex-col lg:h-[31vh] lg:flex-row">
        <div
          className="text-center lg:w-[35%] lg:border-r-2
            lg:border-[var(--border-gray)] lg:text-start"
        >
          <div>
            <span className="text-lg">
              {getSimpleDateFromTimestamp(currentData.dt, {
                weekday: 'long',
              })}
              ,
            </span>
            <span className="custom-gray ml-1">
              {getSimpleDateFromTimestamp(
                currentData.dt,
                {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                },
                'time'
              )}
            </span>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-2xl">{currentData.weather[0].main}</p>
            <p className="text-3xl font-[500]">
              {Math.round(currentData.temp)}°C
            </p>
            <WeatherIcon
              className="m-auto size-25 lg:m-0"
              icon={currentData.weather[0].icon}
            />
          </div>
        </div>
        <div className="lg:pl-8">
          <p className="custom-gray mb-14 text-center text-lg lg:text-start">
            Today's highlights
          </p>
          <div className="grid grid-cols-2 gap-3 text-center lg:text-start">
            <div>
              <span>Wind: </span>
              <span className="custom-gray">{currentData.wind_speed} km/h</span>
            </div>
            <div>
              <span>Humidity: </span>
              <span className="custom-gray">{currentData.humidity}%</span>
            </div>
            <div>
              <span>Clouds: </span>
              <span className="custom-gray">{currentData.clouds}%</span>
            </div>
            <div>
              <span>Pressure: </span>
              <span className="custom-gray">{currentData.pressure} hPa</span>
            </div>
            <div className="flex flex-row justify-center lg:justify-start">
              <p className="lg:text-start">Index UV: </p>
              <p className="custom-gray ml-1 flex flex-row">
                {currentData.uvi}
                <i className="size-2 rounded-[50%] bg-amber-500" />
              </p>
            </div>
            <div>
              <span>Visibility: </span>
              <span className="custom-gray">{currentData.visibility} m</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
