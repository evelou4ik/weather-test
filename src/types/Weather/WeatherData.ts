import {CurrentWeather} from "@/types/Weather/CurrentWeather";
import {HourlyUnits} from "@/types/Weather/HourlyUnits";
import {HourlyData} from "@/types/Weather/HourlyData";

export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather_units: CurrentWeatherUnits;
    current_weather: CurrentWeather;
    hourly_units: HourlyUnits;
    hourly: HourlyData;
}