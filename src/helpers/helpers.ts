import axios from "axios";
import { WEATHER_ICONS } from "@/constants";
import { faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons";

const fetchData = async (url: string) => {
  const { data } = await axios.get(url);

  return data;
};

const getWeatherIcon = (weatherCode: number): IconDefinition => {
  for (const key in WEATHER_ICONS) {
    const codes = key.split(",").map((code) => parseInt(code));

    if (codes.includes(weatherCode)) {
      return WEATHER_ICONS[key];
    }
  }
  return faQuestion;
};

const findExtremeTemperatures = (
  tempreatures: number[],
  type: "min" | "max",
) => {
  if (type === "min") {
    return Math.min(...tempreatures);
  } else {
    return Math.max(...tempreatures);
  }
};

export { fetchData, getWeatherIcon, findExtremeTemperatures };
