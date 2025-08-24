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
import responseJson from '@/response.json';

export const MainPage = () => {
  const [searchText, setSearchText] = useState('');
  const [coordinates, setCoordinates] = useState({
    latitude: 54.352,
    longitude: 18.6466,
  });

  const [currentData, setCurrentData] = useState<ICurrentData | null>(null);
  const [hourlyData, setHourlyData] = useState<IHourlyData[]>([]);
  const [dailyData, setDailyData] = useState<IDailyData[]>([]);

  const { isPending } = useQuery({
    queryKey: ['weatherData', coordinates.latitude, coordinates.longitude],
    queryFn:
      coordinates.latitude && coordinates.longitude
        ? async () => {
            // const response = await fetch(
            //   `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
            // );
            const r = responseJson;
            // const r = await response.json();
            setCurrentData(r.current);
            setHourlyData(r.hourly);
            setDailyData(r.daily);
            return r;
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
    if (!searchText) return;
    geocode(RequestType.ADDRESS, searchText, {
      key: import.meta.env.VITE_GEOCODING_API_KEY,
      outputFormat: OutputFormat.JSON,
    })
      .then((response) => {
        if (!response.results.length || response.status === 'ZERO_RESULTS') {
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
    <div className="px-40 py-10 w-dvw h-dvh overflow-clip">
      <SearchBar handleSearchTextChange={debouncedHandleSearchTextChange} />
      {isPending ? (
        <EmptyState />
      ) : (
        <div className="flex flex-row justify-between h-[calc(95%-2.5rem)]">
          <div className="w-[70%]">
            {currentData && <CurrentData currentData={currentData} />}
            <HourlyData hourlyData={hourlyData} />
          </div>
          <div className="w-[20%] h-full overflow-y-auto">
            <DailyData dailyData={dailyData} />
          </div>
        </div>
      )}
    </div>
  );
};
