import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { debounce } from 'lodash';

import { geocode, RequestType, OutputFormat } from 'react-geocode';
import { SearchBar } from '@/components/SearchBar';
import { DailyData } from '@/components/DailyData';
import { CurrentData } from '@/components/CurrentData';
import { HourlyData } from '@/components/HourlyData';
import { skipToken, useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/EmptyState';
import type { ICurrentData, IHourlyData, IDailyData } from '@/types';
import { showErrorToast } from '@/utils';
import AppIcon from '/app-icon.png';
import '@/assets/scss/animation.scss';
import { GEOCODING_API_KEY, OPENWEATHER_API_KEY } from './constants';
import { goecodingApiResults } from './enums';
import { QueryKeys } from '@/services/queryKeys';


export const MainPage = () => {
  const [searchText, setSearchText] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [currentData, setCurrentData] = useState<ICurrentData | null>(null);
  const [hourlyData, setHourlyData] = useState<IHourlyData[]>([]);
  const [dailyData, setDailyData] = useState<IDailyData[]>([]);

  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.weatherData, coordinates.latitude, coordinates.longitude],
    queryFn:
      coordinates.latitude && coordinates.longitude
        ? async () => {
            const response = await fetch(
              `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );
            return await response.json();
          }
        : skipToken,
  });

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const debouncedHandleSearchTextChange = useMemo(
    () =>
      debounce(
        (e: ChangeEvent<HTMLInputElement>) => handleSearchTextChange(e),
        1000
      ),
    []
  );

  useEffect(() => {
    return () => debouncedHandleSearchTextChange.cancel();
  }, []);

  useEffect(() => {
    if (!data && !(data?.current || data?.hourly || data?.daily)) return
    setCurrentData(data.current);
    setHourlyData(data.hourly);
    setDailyData(data.daily);
  }, [data])

  useEffect(() => {
    if (!searchText) return;
    geocode(RequestType.ADDRESS, searchText, {
      key: GEOCODING_API_KEY,
      outputFormat: OutputFormat.JSON,
    })
      .then((response) => {
        if (!response.results.length || response.status === goecodingApiResults.ZeroResults) {
          showErrorToast('Please provide an existing address');
          return;
        }
        const { lat, lng } = response.results[0].geometry.location;
        setCoordinates({
          ...coordinates,
          latitude: Number(lat),
          longitude: Number(lng),
        });
      })
      .catch(() => {
        showErrorToast('Please provide an existing address');
      });
  }, [searchText]);

  return (
    <div className="relative h-dvh w-dvw lg:px-40 lg:py-10 px-10 py-5 lg:overflow-clip">
      <div
        className="lg:absolute lg:top-0 lg:right-0 mt-2 lg:mr-4 mb-2 flex flex-row
          justify-center"
      >
        <img src={AppIcon} className="size-10" />
        <p className="text-md">The best weather app</p>
      </div>
      <div
        className={`${
          isPending
            ? `roll-out relative top-[50%] left-[50%] flex translate-x-[-50%]
              transform flex-col`
            : 'h-full max-lg:text-center' // TODO: after rerender animate the layout
          }`}
      >
        <SearchBar
          handleSearchTextChange={debouncedHandleSearchTextChange}
          isPending={isPending}
        />
        {isPending ? (
          <EmptyState />
        ) : (
          <div className="lg:flex lg:flex-row justify-between lg:gap-8">
            <div className="lg:w-[70%] w-full">
              {currentData && <CurrentData currentData={currentData} />}
              <HourlyData hourlyData={hourlyData} />
            </div>
            <div className="lg:w-[30%] xl:w-[20%] w-full">
              <DailyData dailyData={dailyData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
