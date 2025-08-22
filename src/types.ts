interface ICommonWeatherData {
  dt: number;
  humidity: number;
  uvi: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

interface ISpecificWeatherData extends ICommonWeatherData {}

export interface ICurrentData extends ICommonWeatherData {}

export interface IHourlyData extends ICommonWeatherData {}

export interface IDailyData extends ICommonWeatherData {
  temp: {
    day: number;
  };
}
