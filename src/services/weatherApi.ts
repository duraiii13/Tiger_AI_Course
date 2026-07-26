import {
  CityResult,
  CurrentWeather,
  DailyItem,
  HourlyItem,
  PlanningRecommendations,
  WeatherData,
  WeatherConditionInfo,
  ActivitySuitability,
  TemperatureUnit,
  SpeedUnit,
  PrecipitationUnit,
} from '../types/weather';

// WMO Weather Interpretation Codes (WW)
export function getWeatherConditionInfo(code: number, isDay: boolean = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        code,
        label: isDay ? 'Clear Sky' : 'Clear Night',
        iconName: isDay ? 'Sun' : 'Moon',
        category: 'clear',
        backgroundGradient: isDay
          ? 'from-sky-400 via-amber-200 to-blue-500'
          : 'from-slate-900 via-indigo-950 to-slate-800',
        cardBg: isDay ? 'bg-amber-50/70 dark:bg-slate-900/80' : 'bg-slate-900/80',
        accentColor: isDay ? 'text-amber-500' : 'text-indigo-400',
      };
    case 1:
      return {
        code,
        label: 'Mainly Clear',
        iconName: isDay ? 'SunDim' : 'Moon',
        category: 'clear',
        backgroundGradient: isDay
          ? 'from-sky-400 via-blue-300 to-sky-600'
          : 'from-slate-900 via-slate-800 to-indigo-950',
        cardBg: 'bg-sky-50/70 dark:bg-slate-900/80',
        accentColor: 'text-amber-400',
      };
    case 2:
      return {
        code,
        label: 'Partly Cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        category: 'cloudy',
        backgroundGradient: isDay
          ? 'from-blue-400 via-indigo-300 to-sky-500'
          : 'from-slate-900 via-indigo-900 to-slate-800',
        cardBg: 'bg-blue-50/70 dark:bg-slate-900/80',
        accentColor: 'text-blue-500',
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        iconName: 'Cloud',
        category: 'cloudy',
        backgroundGradient: 'from-slate-500 via-zinc-400 to-slate-700',
        cardBg: 'bg-slate-100/80 dark:bg-slate-900/80',
        accentColor: 'text-slate-600 dark:text-slate-300',
      };
    case 45:
    case 48:
      return {
        code,
        label: code === 45 ? 'Foggy' : 'Depositing Rime Fog',
        iconName: 'CloudFog',
        category: 'fog',
        backgroundGradient: 'from-slate-400 via-stone-300 to-slate-600',
        cardBg: 'bg-stone-100/80 dark:bg-stone-900/80',
        accentColor: 'text-stone-500',
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: code === 51 ? 'Light Drizzle' : code === 53 ? 'Moderate Drizzle' : 'Dense Drizzle',
        iconName: 'CloudDrizzle',
        category: 'rain',
        backgroundGradient: 'from-teal-600 via-cyan-500 to-blue-700',
        cardBg: 'bg-teal-50/80 dark:bg-teal-950/80',
        accentColor: 'text-teal-500',
      };
    case 56:
    case 57:
      return {
        code,
        label: 'Freezing Drizzle',
        iconName: 'CloudHail',
        category: 'snow',
        backgroundGradient: 'from-cyan-700 via-slate-600 to-blue-900',
        cardBg: 'bg-cyan-50/80 dark:bg-cyan-950/80',
        accentColor: 'text-cyan-400',
      };
    case 61:
      return {
        code,
        label: 'Slight Rain',
        iconName: 'CloudRain',
        category: 'rain',
        backgroundGradient: 'from-blue-600 via-sky-500 to-indigo-700',
        cardBg: 'bg-blue-50/80 dark:bg-slate-900/80',
        accentColor: 'text-blue-500',
      };
    case 63:
      return {
        code,
        label: 'Moderate Rain',
        iconName: 'CloudRain',
        category: 'rain',
        backgroundGradient: 'from-blue-700 via-indigo-600 to-slate-800',
        cardBg: 'bg-blue-100/80 dark:bg-slate-900/80',
        accentColor: 'text-blue-600',
      };
    case 65:
      return {
        code,
        label: 'Heavy Rain',
        iconName: 'CloudRainWind',
        category: 'rain',
        backgroundGradient: 'from-indigo-800 via-slate-700 to-blue-900',
        cardBg: 'bg-indigo-100/80 dark:bg-slate-900/80',
        accentColor: 'text-indigo-600',
      };
    case 66:
    case 67:
      return {
        code,
        label: 'Freezing Rain',
        iconName: 'CloudHail',
        category: 'snow',
        backgroundGradient: 'from-sky-700 via-indigo-800 to-slate-900',
        cardBg: 'bg-sky-100/80 dark:bg-slate-900/80',
        accentColor: 'text-sky-500',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        code,
        label: code === 71 ? 'Light Snow' : code === 73 ? 'Moderate Snow' : 'Heavy Snowfall',
        iconName: 'CloudSnow',
        category: 'snow',
        backgroundGradient: 'from-sky-200 via-indigo-100 to-blue-300 dark:from-slate-900 dark:via-sky-950 dark:to-indigo-950',
        cardBg: 'bg-sky-50/90 dark:bg-slate-900/90',
        accentColor: 'text-sky-400',
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Rain Showers',
        iconName: 'CloudRain',
        category: 'rain',
        backgroundGradient: 'from-blue-500 via-cyan-600 to-slate-700',
        cardBg: 'bg-cyan-50/80 dark:bg-slate-900/80',
        accentColor: 'text-cyan-600',
      };
    case 85:
    case 86:
      return {
        code,
        label: 'Snow Showers',
        iconName: 'CloudSnow',
        category: 'snow',
        backgroundGradient: 'from-indigo-300 via-sky-200 to-blue-400 dark:from-slate-900 dark:via-indigo-950 dark:to-sky-900',
        cardBg: 'bg-indigo-50/90 dark:bg-slate-900/90',
        accentColor: 'text-indigo-400',
      };
    case 95:
      return {
        code,
        label: 'Thunderstorm',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        backgroundGradient: 'from-slate-900 via-amber-950 to-indigo-950',
        cardBg: 'bg-slate-900/90',
        accentColor: 'text-amber-400',
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Thunderstorm with Hail',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        backgroundGradient: 'from-slate-950 via-purple-950 to-indigo-950',
        cardBg: 'bg-slate-900/90',
        accentColor: 'text-purple-400',
      };
    default:
      return {
        code,
        label: 'Variable Weather',
        iconName: 'SunMedium',
        category: 'clear',
        backgroundGradient: 'from-blue-400 to-indigo-600',
        cardBg: 'bg-blue-50/80 dark:bg-slate-900/80',
        accentColor: 'text-blue-500',
      };
  }
}

// 1. City Search Geocoding
export async function searchCities(query: string): Promise<CityResult[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('City not found or network error');
    }
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }
    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      country_code: item.country_code,
      country: item.country,
      admin1: item.admin1,
      admin2: item.admin2,
      timezone: item.timezone,
      population: item.population,
    }));
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('City not found or network error');
  }
}

// 2. Reverse Geocode from Coords
export async function getCityFromCoords(lat: number, lon: number): Promise<CityResult> {
  try {
    // Attempt BigDataCloud free reverse geocode first
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const cityName = data.city || data.locality || data.principalSubdivision || 'Current Location';
      return {
        id: Math.floor(Math.random() * 1000000),
        name: cityName,
        latitude: lat,
        longitude: lon,
        country: data.countryName || '',
        country_code: data.countryCode || '',
        admin1: data.principalSubdivision || '',
      };
    }
  } catch (err) {
    console.warn('Reverse geocode fallback:', err);
  }

  // Fallback
  return {
    id: 999999,
    name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
    latitude: lat,
    longitude: lon,
    country: 'Custom Location',
  };
}

// 3. Fetch Weather Data
export async function fetchWeatherData(
  city: CityResult,
  tempUnit: TemperatureUnit = 'celsius',
  speedUnit: SpeedUnit = 'kmh',
  precipUnit: PrecipitationUnit = 'mm'
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'dew_point_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'pressure_msl',
      'cloud_cover',
      'visibility',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_hours',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
    ].join(','),
    timezone: city.timezone || 'auto',
    temperature_unit: tempUnit,
    wind_speed_unit: speedUnit === 'mph' ? 'mph' : 'kmh',
    precipitation_unit: precipUnit === 'inch' ? 'inch' : 'mm',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('City not found or network error');
    }
    const data = await res.json();

    // Map Current Weather
    const c = data.current;
    const current: CurrentWeather = {
      temperature: c.temperature_2m,
      apparentTemperature: c.apparent_temperature,
      relativeHumidity: c.relative_humidity_2m,
      isDay: Boolean(c.is_day),
      precipitation: c.precipitation,
      rain: c.rain,
      showers: c.showers,
      snowfall: c.snowfall,
      weatherCode: c.weather_code,
      cloudCover: c.cloud_cover,
      pressureMsl: c.pressure_msl,
      surfacePressure: c.surface_pressure,
      windSpeed: c.wind_speed_10m,
      windDirection: c.wind_direction_10m,
      windGusts: c.wind_gusts_10m,
      time: c.time,
    };

    // Map Hourly Data (Next 24 Hours)
    const h = data.hourly;
    const hourly: HourlyItem[] = [];
    const nowISO = c.time;
    let startIndex = 0;
    if (h.time && Array.isArray(h.time)) {
      const foundIdx = h.time.findIndex((t: string) => t >= nowISO);
      if (foundIdx !== -1) startIndex = foundIdx;
    }

    const hourlyLength = Math.min(24, (h.time?.length || 0) - startIndex);
    for (let i = 0; i < hourlyLength; i++) {
      const idx = startIndex + i;
      hourly.push({
        time: h.time[idx],
        temperature: h.temperature_2m[idx],
        apparentTemperature: h.apparent_temperature[idx],
        humidity: h.relative_humidity_2m[idx],
        dewPoint: h.dew_point_2m[idx],
        precipitationProbability: h.precipitation_probability[idx],
        precipitation: h.precipitation[idx],
        weatherCode: h.weather_code[idx],
        pressure: h.pressure_msl[idx],
        cloudCover: h.cloud_cover[idx],
        visibility: h.visibility[idx],
        windSpeed: h.wind_speed_10m[idx],
        uvIndex: h.uv_index[idx],
      });
    }

    // Map Daily Data (7 Days)
    const d = data.daily;
    const daily: DailyItem[] = [];
    const daysCount = Math.min(7, d.time?.length || 0);

    for (let i = 0; i < daysCount; i++) {
      const dateStr = d.time[i];
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayName = i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      daily.push({
        date: dateStr,
        dayName,
        weatherCode: d.weather_code[i],
        tempMax: d.temperature_2m_max[i],
        tempMin: d.temperature_2m_min[i],
        apparentTempMax: d.apparent_temperature_max[i],
        apparentTempMin: d.apparent_temperature_min[i],
        sunrise: d.sunrise[i],
        sunset: d.sunset[i],
        uvIndexMax: d.uv_index_max[i],
        precipSum: d.precipitation_sum[i],
        precipProbMax: d.precipitation_probability_max[i],
        windSpeedMax: d.wind_speed_10m_max[i],
        windGustsMax: d.wind_gusts_10m_max[i],
        windDirectionDominant: d.wind_direction_10m_dominant[i],
      });
    }

    return {
      city,
      current,
      hourly,
      daily,
      timezone: data.timezone || 'UTC',
      elevation: data.elevation || 0,
    };
  } catch (err: any) {
    console.error('Weather data fetch failure:', err);
    throw new Error('City not found or network error');
  }
}

// 4. Generate Planning Insights & Activity Suitability
export function generateRecommendations(
  current: CurrentWeather,
  daily: DailyItem[],
  hourly: HourlyItem[],
  tempUnit: TemperatureUnit = 'celsius'
): PlanningRecommendations {
  const isImperial = tempUnit === 'fahrenheit';
  const tempC = isImperial ? ((current.temperature - 32) * 5) / 9 : current.temperature;

  const today = daily[0];
  const maxPrecipProb = Math.max(...hourly.slice(0, 12).map((h) => h.precipitationProbability || 0), today?.precipProbMax || 0);
  const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(current.weatherCode) || maxPrecipProb > 30;
  const isSnowing = [56, 57, 66, 67, 71, 73, 75, 77, 85, 86].includes(current.weatherCode);

  // Umbrella Alert
  const umbrellaAlert = isRaining || maxPrecipProb >= 40;
  let umbrellaReason = '';
  if (isRaining) {
    umbrellaReason = 'Current or upcoming rain detected. Pack a sturdy umbrella!';
  } else if (maxPrecipProb >= 40) {
    umbrellaReason = `High rain chance (${maxPrecipProb}%) in the coming hours. Carry an umbrella just in case.`;
  }

  // Clothing & Outfit Tips
  let clothingPrimary = '';
  let clothingLayers = '';
  const accessories: string[] = [];

  if (tempC <= 0) {
    clothingPrimary = 'Heavy winter coat, thermal top & pants';
    clothingLayers = 'Insulated inner layers, wool sweater';
    accessories.push('Warm beanie', 'Thermal gloves', 'Wool scarf', 'Snow boots');
  } else if (tempC > 0 && tempC <= 10) {
    clothingPrimary = 'Warm jacket or heavy trench coat';
    clothingLayers = 'Sweater or hoodie with long sleeves';
    accessories.push('Light scarf', 'Gloves');
  } else if (tempC > 10 && tempC <= 18) {
    clothingPrimary = 'Light jacket, cardigan, or denim jacket';
    clothingLayers = 'Long-sleeve shirt or comfortable blouse';
    accessories.push('Closed shoes / sneakers');
  } else if (tempC > 18 && tempC <= 25) {
    clothingPrimary = 'Short-sleeve shirt, t-shirt, or light dress';
    clothingLayers = 'Light layer for evening wind if needed';
    accessories.push('Comfortable sneakers');
  } else {
    clothingPrimary = 'Breathable cotton shirt, shorts, or linen clothes';
    clothingLayers = 'Ultra-light, sweat-wicking fabrics';
    accessories.push('Sunglasses', 'Sunhat / Cap', 'High SPF Sunscreen');
  }

  if (umbrellaAlert) {
    accessories.push('Waterproof raincoat / Umbrella');
  }

  // Weather Advisories
  const alerts: PlanningRecommendations['alerts'] = [];

  if (today?.uvIndexMax >= 6) {
    alerts.push({
      type: 'warning',
      title: 'High UV Index Warning',
      message: `Maximum UV index will reach ${today.uvIndexMax.toFixed(1)} today. Apply SPF 30+ sunscreen and seek shade during peak midday hours.`,
    });
  }

  if (current.windSpeed > 35) {
    alerts.push({
      type: 'caution',
      title: 'High Wind Advisory',
      message: `Strong gusts up to ${current.windGusts.toFixed(0)} detected. Secure loose outdoor objects and exercise caution while driving.`,
    });
  }

  if (tempC >= 32) {
    alerts.push({
      type: 'warning',
      title: 'Extreme Heat Caution',
      message: 'High temperatures expected. Drink plenty of water and avoid strenuous outdoor exercise during peak heat hours.',
    });
  } else if (tempC <= 0) {
    alerts.push({
      type: 'info',
      title: 'Freezing Conditions',
      message: 'Watch out for black ice on roads and pavements. Stay warm and protect exposed skin.',
    });
  }

  if (umbrellaAlert) {
    alerts.push({
      type: 'caution',
      title: 'Rain & Wet Conditions',
      message: umbrellaReason,
    });
  }

  // Outdoor Activities Evaluation
  const activities: ActivitySuitability[] = [
    evaluateActivity('Running & Jogging', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'sports', 'Activity'),
    evaluateActivity('Cycling & Commuting', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'sports', 'Bike'),
    evaluateActivity('Outdoor Dining', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'leisure', 'Utensils'),
    evaluateActivity('Photography & Sightseeing', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'leisure', 'Camera'),
    evaluateActivity('Stargazing', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'leisure', 'Sparkles', current.cloudCover),
    evaluateActivity('Driving & Road Trips', tempC, current.windSpeed, maxPrecipProb, today?.uvIndexMax || 0, 'travel', 'Car', 0, isSnowing),
  ];

  // Best Outdoor Hours
  const bestOutdoorHours = hourly
    .slice(0, 16)
    .filter((h) => {
      const hTempC = isImperial ? ((h.temperature - 32) * 5) / 9 : h.temperature;
      return h.precipitationProbability < 25 && h.windSpeed < 25 && hTempC >= 12 && hTempC <= 28;
    })
    .slice(0, 4)
    .map((h) => {
      const hourDate = new Date(h.time);
      const formattedTime = hourDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      return {
        time: formattedTime,
        reason: `${h.precipitationProbability}% rain, mild wind (${h.windSpeed.toFixed(0)})`,
        temp: Math.round(h.temperature),
      };
    });

  // UV & Wind Advice
  const maxUV = today?.uvIndexMax || 0;
  let uvAdvice = 'UV index is low. Minimal sun protection required.';
  if (maxUV >= 8) uvAdvice = 'Very High UV! Extra protection required. Wear hat, sunglasses, and SPF 50+.';
  else if (maxUV >= 6) uvAdvice = 'High UV Index. Apply sunscreen and wear protective eyewear.';
  else if (maxUV >= 3) uvAdvice = 'Moderate UV. Sun protection recommended during midday hours.';

  let windAdvice = 'Gentle breeze. Ideal for all outdoor plans.';
  if (current.windSpeed > 40) windAdvice = 'Strong winds! Hazardous for high-altitude activities or light structures.';
  else if (current.windSpeed > 25) windAdvice = 'Moderate breeze. Noticeable wind impact on cycling or outdoor sports.';

  return {
    umbrellaAlert,
    umbrellaReason,
    clothingTips: {
      primary: clothingPrimary,
      layers: clothingLayers,
      accessories,
    },
    alerts,
    activities,
    bestOutdoorHours,
    uvAdvice,
    windAdvice,
  };
}

function evaluateActivity(
  name: string,
  tempC: number,
  windSpeed: number,
  precipProb: number,
  uvIndex: number,
  category: 'sports' | 'leisure' | 'travel',
  icon: string,
  cloudCover: number = 0,
  isSnowing: boolean = false
): ActivitySuitability {
  let score = 100;
  const reasons: string[] = [];

  // Temp penalties
  if (tempC < 5) {
    score -= 30;
    reasons.push('Chilly temperatures');
  } else if (tempC > 30) {
    score -= 25;
    reasons.push('High heat');
  }

  // Precip penalties
  if (precipProb > 50) {
    score -= 50;
    reasons.push('High rain probability');
  } else if (precipProb > 20) {
    score -= 20;
    reasons.push('Light precipitation risk');
  }

  // Wind penalties
  if (windSpeed > 30) {
    score -= 35;
    reasons.push('Strong winds');
  } else if (windSpeed > 20) {
    score -= 15;
  }

  // Stargazing specific
  if (name === 'Stargazing') {
    if (cloudCover > 60) {
      score -= 60;
      reasons.push('Heavy cloud cover');
    } else if (cloudCover > 20) {
      score -= 25;
      reasons.push('Partial cloudiness');
    }
  }

  // Driving specific
  if (name === 'Driving & Road Trips') {
    if (isSnowing) {
      score -= 40;
      reasons.push('Icy/snowy roads');
    }
  }

  score = Math.max(0, Math.min(100, score));

  let status: ActivitySuitability['status'] = 'Ideal';
  if (score < 30) status = 'Not Recommended';
  else if (score < 55) status = 'Poor';
  else if (score < 75) status = 'Fair';
  else if (score < 90) status = 'Good';

  const reason = reasons.length > 0 ? reasons.join(', ') : 'Comfortable weather conditions';

  return {
    name,
    category,
    score,
    status,
    reason,
    icon,
  };
}
