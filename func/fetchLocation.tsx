//write type for this function as return is  {latitude: number, longitude:number}
export const fetchLocation = async (
  place_id: string
): Promise<{ latitude: number; longitude: number }> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${process.env.EXPO_PUBLIC_GOOGLE_KEY}`
  );
  const data = await response.json();
  console.log({
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng,
  });

  return {
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng,
  };
};
