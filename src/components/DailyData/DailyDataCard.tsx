export const DailyDataCard = ({
  date,
  temp,
  icon,
}: {
  date: number;
  temp: number;
  icon: string;
}) => {
  const formattedDate = new Date(date * 1000);

  return (
    <div className="bg-white opacity-50 rounded-lg mb-6 p-3 shadow-md">
      <p className="text-lg font-medium">
        {formattedDate.toLocaleDateString('en-US', { weekday: 'long' })},
      </p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="custom-gray">
            {formattedDate
              .toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })
              .replace('/', '.')}
          </p>
          <p className="text-3xl font-medium">{Math.round(temp)}°C</p>
        </div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather-icon"
          />
        </div>
      </div>
    </div>
  );
};
