import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { WEATHER_URL } from "@/constants";
import {
  fetchData,
  findExtremeTemperatures,
  getWeatherIcon,
} from "@/helpers/helpers";

function getWeatherUrl(latitude: string, longitude: string) {
  return `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;
}

export default function useGetWeather(latitude: string, longitude: string) {
  const [chartData, setChartData] = useState({
    categories: Array.from({ length: 24 }, (_, i) => i.toString()),
    seriesData: Array.from({ length: 24 }, () => 0),
  });

  const { data, isSuccess } = useQuery(
    ["weather", { latitude, longitude }],
    () => fetchData(getWeatherUrl(latitude, longitude)),
    {
      refetchInterval: 300000,
      cacheTime: 300000,
    },
  );

  const hourlyTemperature = data?.hourly.temperature_2m || [];
  const weatherIcon = getWeatherIcon(data?.current_weather.weathercode ?? 100);

  const weatherValues = {
    minWeatherValue: findExtremeTemperatures(
      hourlyTemperature.slice(0, 23),
      "min",
    ),
    currentWeatherValue: Number(
      isSuccess ? data.current_weather.temperature : 0,
    ),
    maxWeatherValue: findExtremeTemperatures(
      hourlyTemperature.slice(0, 23),
      "max",
    ),
  };

  useEffect(() => {
    const hourlyTemperature = data?.hourly["temperature_2m"].slice(0, 24);

    setChartData((prevState) => {
      return {
        ...prevState,
        seriesData: hourlyTemperature,
      };
    });
  }, [isSuccess]);

  return { isSuccess, weatherValues, chartData, weatherIcon };
}
