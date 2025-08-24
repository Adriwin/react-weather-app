import type { ICurrentData } from '@/types';
import '@/styles/Colors.scss';
import { getSimpleDateFromTimestamp } from '@/utils';

export const CurrentData = ({ currentData }: { currentData: ICurrentData }) => {
  return (
    <>
      <h2 className="custom-gray">Today</h2>
      <div className="flex flex-row">
        <div className="w-[35%] border-r-2 border-[var(--border-gray)]">
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
            <p className="text-2xl mb-2">{currentData.weather[0].main}</p>
            <p className="text-5xl font-[500]">
              {Math.round(currentData.temp)}°C
            </p>
            <img
              className="size-35"
              src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
        </div>
        <div className="pl-8">
          <p className="custom-gray text-lg mb-14">Today's highlights</p>
          <div className="grid grid-cols-2 gap-3">
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
            <div className="flex flex-row">
              <span>Index UV: </span>
              <span className="custom-gray flex flex-row ml-1">
                {currentData.uvi}
                <div className="size-2 bg-amber-500 rounded-[50%]" />
              </span>
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
