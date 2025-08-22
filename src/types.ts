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

interface ISpecificWeatherData extends ICommonWeatherData {
  temp: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  humidity: number;
  clouds: number;
}

export interface ICurrentData extends ISpecificWeatherData {}

export interface IHourlyData extends ISpecificWeatherData {}

export interface IDailyData extends ICommonWeatherData {
  temp: {
    day: number;
  };
}
