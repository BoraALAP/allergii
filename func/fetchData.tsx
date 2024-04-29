import * as Location from "expo-location";

const fetchData = async (apiDataDispatch: any, dispatch: any) => {
  const {
    coords: { longitude, latitude },
  } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Low,
  });

  // Set location
  await dispatch({
    type: "SET_LOCATION",
    payload: { latitude, longitude },
  });

  let fetchURL = `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_WEATHER_API_URL}&days=10&aqi=yes&alerts=yes`;
  let fetchWorldURL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.EXPO_PUBLIC_WORLD_WEATHER_API_URL}&format=json&q=${latitude},${longitude}&num_of_days=14&aqi=no&alerts=yes`;
  let fetchGoogleURL = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}`;
  try {
    const response = await fetch(fetchURL);
    const data = await response.json();

    const googleResponse = await fetch(fetchGoogleURL, {
      method: "POST",
      body: JSON.stringify({
        location: {
          latitude: latitude,
          longitude: longitude,
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
    const googleData = await googleResponse.json();

    apiDataDispatch({
      type: "LOAD_DATA",
      payload: { ...data, googleairquality: googleData },
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;
