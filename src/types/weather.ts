export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'inch';

export interface UnitSettings {
  temp: TemperatureUnit;
  speed: SpeedUnit;
  precip: PrecipitationUnit;
}

export interface CityResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string; // State / Region
  admin2?: string;
  admin3?: string;
  admin4?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  isDay: boolean;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weatherCode: number;
  cloudCover: number;
  pressureMsl: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  time: string;
}

export interface HourlyItem {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  dewPoint: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  pressure: number;
  cloudCover: number;
  visibility: number;
  windSpeed: number;
  uvIndex: number;
}

export interface DailyItem {
  date: string;
  dayName: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipSum: number;
  precipProbMax: number;
  windSpeedMax: number;
  windGustsMax: number;
  windDirectionDominant: number;
}

export interface WeatherData {
  city: CityResult;
  current: CurrentWeather;
  hourly: HourlyItem[];
  daily: DailyItem[];
  timezone: string;
  elevation: number;
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  iconName: string; // Lucide icon name mapping
  category: 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunderstorm';
  backgroundGradient: string;
  cardBg: string;
  accentColor: string;
}

export interface ActivitySuitability {
  name: string;
  category: 'sports' | 'leisure' | 'travel';
  score: number; // 0 to 100
  status: 'Ideal' | 'Good' | 'Fair' | 'Poor' | 'Not Recommended';
  reason: string;
  icon: string;
}

export interface PlanningRecommendations {
  umbrellaAlert: boolean;
  umbrellaReason?: string;
  clothingTips: {
    primary: string;
    layers: string;
    accessories: string[];
  };
  alerts: {
    type: 'warning' | 'info' | 'caution' | 'success';
    title: string;
    message: string;
  }[];
  activities: ActivitySuitability[];
  bestOutdoorHours: {
    time: string;
    reason: string;
    temp: number;
  }[];
  uvAdvice: string;
  windAdvice: string;
}
