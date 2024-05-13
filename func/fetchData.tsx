const fetchData = async (location: { latitude: number; longitude: number }) => {
  let fetchURL = `https://api.weatherapi.com/v1/forecast.json?q=${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_WEATHER_API_URL}&days=10&aqi=yes&alerts=yes`;
  // let fetchWorldURL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.EXPO_PUBLIC_WORLD_WEATHER_API_URL}&format=json&q=${latitude},${longitude}&num_of_days=14&aqi=no&alerts=yes`;
  let fetchGoogleAirQualityURL = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}`;
  let fetchGooglePollenyURL = `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}&location.longitude=${location.longitude}&location.latitude=${location.latitude}&days=3`;

  const response = await fetch(fetchURL);
  const googleAirQualityResponse = await fetch(fetchGoogleAirQualityURL, {
    method: "POST",
    body: JSON.stringify({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      universalAqi: true,
      extraComputations: [
        "HEALTH_RECOMMENDATIONS",
        "DOMINANT_POLLUTANT_CONCENTRATION",
        "POLLUTANT_CONCENTRATION",
        "LOCAL_AQI",
        "POLLUTANT_ADDITIONAL_INFO",
      ],
    }),
  });
  const googlePollenResponse = await fetch(fetchGooglePollenyURL);

  const data = await response.json();
  const googleAirQualityData = await googleAirQualityResponse.json();
  const googlePollenData = await googlePollenResponse.json();

  return {
    ...(await data),
    googleairquality: await googleAirQualityData,
    googlepollen: await googlePollenData,
  };
};

export default fetchData;
