export type ActionType = {
  type: string;
  payload?: any;
};

export type LocationType = {
  name: string;
  country: string;
  region: string;
  tz_id: string;
  localtime: Date;
  lat: number;
  lon: number;
};

export type AirQualityType = {
  aqi_data?: number; //	Air Quality Index
  co: number; //	Carbon Monoxide (μg/m3)
  o3: number; //	Ozone (μg/m3)
  no2: number; //	Nitrogen dioxide (μg/m3)
  so2: number; //	Sulphur dioxide (μg/m3)
  pm25: number; //	PM2.5 (μg/m3)
  pm10: number; //	PM10 (μg/m3)
  "us-epa-index": number; //	US - EPA standard.
  "gb-defra-index": number; // UK Defra Index
  // Index	1	2	3	4	5	6	7	8	9	10
  // Band	Low	Low	Low	Moderate	Moderate	Moderate	High	High	High	Very High
  // µgm-3	0-11	12-23	24-35	36-41	42-47	48-53	54-58	59-64	65-70	71 or more
};

export type AstroType = {
  sunrise: string; //	Sunrise time
  sunset: string; //	Sunset time
  moonrise: string; //	Moonrise time
  moonset: string; //	Moonset time
  moon_phase: string; //	Moon phases. Value returned:
  // New Moon
  // Waxing Crescent
  // First Quarter
  // Waxing Gibbous
  // Full Moon
  // Waning Gibbous
  // Last Quarter
  // Waning Crescent
  moon_illumination: number; //Moon illumination as %
  is_moon_up: number;
  is_sun_up: number;
};

export type ConditionType = {
  text: string; //	Weather condition text
  icon: string; //	Weather condition icon
  code: number; //	Weather condition code
};

export type MomentType = {
  condition: ConditionType; //	Weather condition
  temp_c: number; //Temperature in celsius
  temp_f: number; //Temperature in fahrenheit
  wind_mph: number; //	Maximum wind speed in miles per hour
  wind_kph: number; //	Maximum wind speed in kilometer per hour
  wind_degree: number; //	Wind direction in degrees
  wind_dir: string; //Wind direction as 16 point compass. e.g.: NSW
  pressure_mb: number; //	Pressure in millibars
  pressure_in: number; //	Pressure in inches
  precip_mm: number; //	Precipitation amount in millimeters
  precip_in: number; //	Precipitation amount in inches
  humidity: number; //	Humidity as percentage
  cloud: number; //	Cloud cover as percentage
  feelslike_c: number; //	Feels like temperature as celcius
  feelslike_f: number; //	Feels like temperature as fahrenheit
  is_day: number; //	1 = Yes 0 = No Whether to show day condition icon or night icon
  gust_mph: number; //	Wind gust in miles per hour
  gust_kph: number; //	Wind gust in kilometer per hour
  vis_km: number; //	Visibility in kilometer
  vis_miles: number; //	Visibility in miles
  uv: number; //	UV Index
  air_quality: AirQualityType; //	Air quality index
};

export type HourType = {
  time: string; //	Date and time
  time_epoch: number; //	Date and time in unix time
  snow_cm: number; //	Snowfall in centimeters
  windchill_c: number; //	Windchill temperature in celcius
  windchill_f: number; //	Windchill temperature in fahrenheit
  heatindex_c: number; //	Heat index in celcius
  heatindex_f: number; //	Heat index in fahrenheit
  dewpoint_c: number; //	Dew point in celcius
  dewpoint_f: number; //	Dew point in fahrenheit
  will_it_rain: number; //	1 = Yes 0 = No Will it will rain or not
  will_it_snow: number; //	1 = Yes 0 = No Will it snow or not
  chance_of_rain: number; //	Chance of rain as percentage
  chance_of_snow: number; //	Chance of snow as percentage
  short_rad: number; //	Shortwave solar radiation or Global horizontal irradiation (GHI) W/m²
  diff_rad: number; //	Diffuse Horizontal Irradiation (DHI) W/m²
} & MomentType;

export type DayType = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  condition: { text: string; icon: string; code: number };
  uv: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  air_quality: AirQualityType;
};

export type CurrentStateType = {
  last_updated: string; //	Local time when the real time data was updated.
  last_updated_epoch: number; //	Local time when the real time data was updated in unix time.
} & MomentType;

export type AlertType = {
  headline: string; //	Alert headline
  msgType?: string; //	Type of alert
  severity: string; //	Severity of alert
  urgency: string; //	Urgency
  areas?: string; //	Areas covered
  category: string; //	Category
  certainty: string; //	Certainty
  event: string; //	Event
  note?: string; //	Note
  effective: string; //	Effective
  expires: string; //	Expires
  desc: string; //	Description
  instruction?: string; //	Instruction
};

export type ForecastType = {
  astro: AstroType;
  date: string;
  date_epoch: number;
  day: DayType;
  hour: HourType[];
};

export type GoogleAirQualityType = {
  error?: {};
  dateTime: string;
  healthRecommendations: {
    athletes: string;
    children: string;
    generalPopulation: string;
    hearthDiseasePopulation: string;
    lungDiseasePopulation: string;
    pregnantWomen: string;
  };
  indexes: {
    aqi: number;
    category: string;
    color: { red: number; green: number; blue: number };
    displayName: string;
    aqiDisplay: string;
    dominantPollutant: string;
    code: string;
  }[];
  pollutants: {
    additionalInfo: { effects: string; sources: string };
    displayName: string;
    fullName: string;
    code: "co" | "no2" | "o3" | "so2" | "pm25" | "pm10";
    concentration: { value: number; units: string };
  }[];
  regionCode: string;
};

export type GooglePollenType = {
  error?: {};
  dailyInfo: [
    {
      date: {
        day: number;
        month: number;
        year: number;
      };
      plantInfo: [
        {
          code: string;
          displayName: string;
          inSeason?: boolean;
          indexInfo: {
            code: string;
            displayName: string;
            value: number;
            category: string;
            indexDescription: string;
            color: { red: number; green: number; blue: number };
          };
          plantDescription: {
            code: string;
            displayName: string;
            description: string;
            symptoms: string;
            prevention: string;
            treatment: string;
          };
        }
      ];
      pollenTypeInfo: [
        {
          code: string;
          displayName: string;
          healthRecommendations: string[];
          inSeason?: boolean;
          indexInfo: {
            code: string;
            displayName: string;
            value: number;
            category: string;
            indexDescription: string;
            color: { red: number; green: number; blue: number };
          };
        }
      ];
    }
  ];
  regionCode: string;
};
