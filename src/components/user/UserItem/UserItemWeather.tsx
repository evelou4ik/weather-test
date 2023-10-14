import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import WeatherField from "@/components/WeatherField";

interface Props {
  weatherValue: {
    minWeatherValue: number;
    currentWeatherValue: number;
    maxWeatherValue: number;
  };
  icon: IconDefinition;
}

export default function UserItemWeather(props: Props) {
  const {
    weatherValue: { minWeatherValue, currentWeatherValue, maxWeatherValue },
    icon,
  } = props;

  return (
    <div
      className={"flex items-center p-4 border-2 rounded-lg shadow-md gap-2 mt-auto mb-4"}
    >
      <FontAwesomeIcon icon={icon} />
      <div className="flex flex-col md:flex-row gap-2">
        <WeatherField label="Lowest" value={minWeatherValue} />
        <WeatherField label="Currently" value={currentWeatherValue} />
        <WeatherField label="Highest" value={maxWeatherValue} />
      </div>
    </div>
  );
}
