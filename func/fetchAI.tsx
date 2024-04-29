const fetchAIData = async (
  weatherData: any,
  NowAiDataDispatch: any,
  distance: number,
  temp: number
) => {
  const distanceType = distance === 0 ? "km" : "miles";
  const tempType = temp === 0 ? "°C" : "°F";

  // const assistantId = "asst_noC31fwI0ZgXEcKZ445cLvXV"; // Replace with your assistant ID
  // let fetchAIURL = `https://api.openai.com/v1/assistants/${assistantId}`;
  let fetchAIURL = `https://api.openai.com/v1/chat/completions`;

  let header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_API}`,
    // "OpenAI-Beta": "assistants=v1",
  };

  try {
    const response = await fetch(fetchAIURL, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Api will provide you a data in JSON format. You will help out the user who sees that information with helpful tips regarding the weather. Information will include a forecast as well. but the main suggestion should be for today and at the moment. use ${distanceType} and ${tempType} for distance and temperature respectively. don't mention the json. speak like here is the suggestions`,
          },
          {
            role: "user",
            content: `here is the json data object ${JSON.stringify(
              weatherData.current
            )}`,
          },
        ],
      }),
    });

    const data = await response.json();

    NowAiDataDispatch({
      type: "SET_DATA",
      payload: { message: await data.choices },
    });
  } catch (error) {
    console.log(error);
  }
};

export default fetchAIData;
