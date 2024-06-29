import { ApiDataContext } from "@/context/apidata";
import { GlobalContext } from "@/context/global";
import { useContext, useEffect, useState } from "react";

const useFetch = () => {
  const { apiDataDispatch } = useContext(ApiDataContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState();

  const fetchData = async (lat: number, long: number) => {
    setLoading(true);

    let fetchURL = `https://api.weatherapi.com/v1/forecast.json?q=${lat},${long}&key=${process.env.EXPO_PUBLIC_WEATHER_API_URL}&days=10&aqi=yes&alerts=yes`;
    // let fetchWorldURL = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.EXPO_PUBLIC_WORLD_WEATHER_API_URL}&format=json&q=${lat},${long}&num_of_days=14&aqi=no&alerts=yes`;
    let fetchGoogleAirQualityURL = `https://airquality.googleapis.com/v1/currentConditions:lookup?&key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}`;
    let fetchGooglePollenURL = `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}&location.longitude=${long}&location.latitude=${lat}&days=5&plantsDescription=0`;
    let fetchGAirQualityHourlyURL = `https://airquality.googleapis.com/v1/forecast:lookup?key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}&location.longitude=${long}&location.latitude=${lat}&days=3`;

    try {
      const response = await fetch(fetchURL);
      const weatherData = await response.json();
      // const googleAirQualityHourlyResponse = await fetch(fetchGooglePollenURL);
      const googlePollenResponse = await fetch(fetchGooglePollenURL);
      const pollenData = await googlePollenResponse.json();
      const googleAirQualityResponse = await fetch(fetchGoogleAirQualityURL, {
        method: "POST",
        body: JSON.stringify({
          location: {
            latitude: lat,
            longitude: long,
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

      const airQualityData = await googleAirQualityResponse.json();

      const combinedData = {
        ...weatherData,
        googleairquality: airQualityData,
        googlepollen: pollenData,
      };

      apiDataDispatch({
        type: "LOAD_DATA",
        payload: await combinedData,
      });

      await setData(combinedData);
    } catch (error) {
      // setError(error);
      console.log("fetch error", error);
      setLoading(false);
      // Handle the error here
    } finally {
      console.log("fetch complete");

      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
