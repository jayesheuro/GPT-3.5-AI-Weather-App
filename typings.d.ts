interface CurrentWeather {
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
}
interface Daily {
    apparent_temperature_max: [number];
    apparent_temperature_min: [number];
    sunrise: [string];
    sunset: [string];
    temperature_2m_max: [number];
    temperature_2m_min: [number];
    time: [string];
    uv_index_clear_sky_max: [number];
    uv_index_max: [number];
}
interface DailyUnits {
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
    uv_index_clear_sky_max: string;
    uv_index_max: string;
}
interface Hourly {
    apparent_temperature: [number];
    dewpoint_2m: [number];
    precipitation: [number];
    precipitation_probability: [number];
    rain: [number];
    relativehumidity_2m: [number];
    shortwave_radiation: [number];
    showers: [number];
    snow_depth: [number];
    snowfall: [number];
    temperature_2m: [number];
    temperature_80m: [number];
    time: [string];
    uv_index: [number];
    uv_index_clear_sky: [number];
    visibility: [number];
    windspeed_10m: [number];
}
interface HourlyUnits {
    apparent_temperature: string;
    dewpoint_2m: string;
    precipitation: string;
    precipitation_probability: string;
    rain: string;
    relativehumidity_2m: string;
    shortwave_radiation: string;
    showers: string;
    snow_depth: string;
    snowfall: string;
    temperature_2m: string;
    temperature_80m: string;
    time: string;
    uv_index: string;
    uv_index_clear_sky: string;
    visibility: string;
    windspeed_10m: string;
}
interface Root {
    current_weather: CurrentWeather;
    daily: Daily;
    daily_units: DailyUnits;
    elevation: number;
    generationtime_ms: number;
    hourly: Hourly;
    hourly_units: HourlyUnits;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: number;
    utc_offset_seconds: number;
}
