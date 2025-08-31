interface IWeatherIcon {
  icon: string;
  className?: string;
}

export const WeatherIcon = ({ icon, className }: IWeatherIcon) => {
  return (
    <img
      className={className}
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather-icon"
    />
  );
};
