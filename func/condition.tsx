const weatherCodes = [
  {
    code: 1000,
    day: {
      text: "Sunny",
      icon: 113,
    },
    night: {
      text: "Clear",
      icon: 113,
    },
  },
  {
    code: 1003,
    day: {
      text: "Partly cloudy",
      icon: 116,
    },
    night: {
      text: "Partly cloudy",
      icon: 116,
    },
  },
  {
    code: 1006,
    day: {
      text: "Cloudy",
      icon: 119,
    },
    night: {
      text: "Cloudy",
      icon: 119,
    },
  },
  {
    code: 1009,
    day: {
      text: "Overcast",
      icon: 122,
    },
    night: {
      text: "Overcast",
      icon: 122,
    },
  },
  {
    code: 1030,
    day: {
      text: "Mist",
      icon: 143,
    },
    night: {
      text: "Mist",
      icon: 143,
    },
  },
  {
    code: 1063,
    day: {
      text: "Patchy rain possible",
      icon: 176,
    },
    night: {
      text: "Patchy rain possible",
      icon: 176,
    },
  },
  {
    code: 1066,
    day: {
      text: "Patchy snow possible",
      icon: 179,
    },
    night: {
      text: "Patchy snow possible",
      icon: 179,
    },
  },
  {
    code: 1069,
    day: {
      text: "Patchy sleet possible",
      icon: 182,
    },
    night: {
      text: "Patchy sleet possible",
      icon: 182,
    },
  },
  {
    code: 1072,
    day: {
      text: "Patchy freezing drizzle possible",
      icon: 185,
    },
    night: {
      text: "Patchy freezing drizzle possible",
      icon: 185,
    },
  },
  {
    code: 1087,
    day: {
      text: "Thundery outbreaks possible",
      icon: 200,
    },
    night: {
      text: "Thundery outbreaks possible",
      icon: 200,
    },
  },
  {
    code: 1114,
    day: {
      text: "Blowing snow",
      icon: 227,
    },
    night: {
      text: "Blowing snow",
      icon: 227,
    },
  },
  {
    code: 1117,
    day: {
      text: "Blizzard",
      icon: 230,
    },
    night: {
      text: "Blizzard",
      icon: 230,
    },
  },
  {
    code: 1135,
    day: {
      text: "Fog",
      icon: 248,
    },
    night: {
      text: "Fog",
      icon: 248,
    },
  },
  {
    code: 1147,
    day: {
      text: "Freezing fog",
      icon: 260,
    },
    night: {
      text: "Freezing fog",
      icon: 260,
    },
  },
  {
    code: 1150,
    day: {
      text: "Patchy light drizzle",
      icon: 263,
    },
    night: {
      text: "Patchy light drizzle",
      icon: 263,
    },
  },
  {
    code: 1153,
    day: {
      text: "Light drizzle",
      icon: 266,
    },
    night: {
      text: "Light drizzle",
      icon: 266,
    },
  },
  {
    code: 1168,
    day: {
      text: "Freezing drizzle",
      icon: 281,
    },
    night: {
      text: "Freezing drizzle",
      icon: 281,
    },
  },
  {
    code: 1171,
    day: {
      text: "Heavy freezing drizzle",
      icon: 284,
    },
    night: {
      text: "Heavy freezing drizzle",
      icon: 284,
    },
  },
  {
    code: 1180,
    day: {
      text: "Patchy light rain",
      icon: 293,
    },
    night: {
      text: "Patchy light rain",
      icon: 293,
    },
  },
  {
    code: 1183,
    day: {
      text: "Light rain",
      icon: 296,
    },
    night: {
      text: "Light rain",
      icon: 296,
    },
  },
  {
    code: 1186,
    day: {
      text: "Moderate rain at times",
      icon: 299,
    },
    night: {
      text: "Moderate rain at times",
      icon: 299,
    },
  },
  {
    code: 1189,
    day: {
      text: "Moderate rain",
      icon: 302,
    },
    night: {
      text: "Moderate rain",
      icon: 302,
    },
  },
  {
    code: 1192,
    day: {
      text: "Heavy rain at times",
      icon: 305,
    },
    night: {
      text: "Heavy rain at times",
      icon: 305,
    },
  },
  {
    code: 1195,
    day: {
      text: "Heavy rain",
      icon: 308,
    },
    night: {
      text: "Heavy rain",
      icon: 308,
    },
  },
  {
    code: 1198,
    day: {
      text: "Light freezing rain",
      icon: 311,
    },
    night: {
      text: "Light freezing rain",
      icon: 311,
    },
  },
  {
    code: 1201,
    day: {
      text: "Moderate or heavy freezing rain",
      icon: 314,
    },
    night: {
      text: "Moderate or heavy freezing rain",
      icon: 314,
    },
  },
  {
    code: 1204,
    day: {
      text: "Light sleet",
      icon: 317,
    },
    night: {
      text: "Light sleet",
      icon: 317,
    },
  },
  {
    code: 1207,
    day: {
      text: "Moderate or heavy sleet",
      icon: 320,
    },
    night: {
      text: "Moderate or heavy sleet",
      icon: 320,
    },
  },
  {
    code: 1210,
    day: {
      text: "Patchy light snow",
      icon: 323,
    },
    night: {
      text: "Patchy light snow",
      icon: 323,
    },
  },
  {
    code: 1213,
    day: {
      text: "Light snow",
      icon: 326,
    },
    night: {
      text: "Light snow",
      icon: 326,
    },
  },
  {
    code: 1216,
    day: {
      text: "Patchy moderate snow",
      icon: 329,
    },
    night: {
      text: "Patchy moderate snow",
      icon: 329,
    },
  },
  {
    code: 1219,
    day: {
      text: "Moderate snow",
      icon: 332,
    },
    night: {
      text: "Moderate snow",
      icon: 332,
    },
  },
  {
    code: 1222,
    day: {
      text: "Patchy heavy snow",
      icon: 335,
    },
    night: {
      text: "Patchy heavy snow",
      icon: 335,
    },
  },
  {
    code: 1225,
    day: {
      text: "Heavy snow",
      icon: 338,
    },
    night: {
      text: "Heavy snow",
      icon: 338,
    },
  },
  {
    code: 1237,
    day: {
      text: "Ice pellets",
      icon: 350,
    },
    night: {
      text: "Ice pellets",
      icon: 350,
    },
  },
  {
    code: 1240,
    day: {
      text: "Light rain shower",
      icon: 353,
    },
    night: {
      text: "Light rain shower",
      icon: 353,
    },
  },
  {
    code: 1243,
    day: {
      text: "Moderate or heavy rain shower",
      icon: 356,
    },
    night: {
      text: "Moderate or heavy rain shower",
      icon: 356,
    },
  },
  {
    code: 1246,
    day: {
      text: "Torrential rain shower",
      icon: 359,
    },
    night: {
      text: "Torrential rain shower",
      icon: 359,
    },
  },
  {
    code: 1249,
    day: {
      text: "Light sleet showers",
      icon: 362,
    },
    night: {
      text: "Light sleet showers",
      icon: 362,
    },
  },
  {
    code: 1252,
    day: {
      text: "Moderate or heavy sleet showers",
      icon: 365,
    },
    night: {
      text: "Moderate or heavy sleet showers",
      icon: 365,
    },
  },
  {
    code: 1255,
    day: {
      text: "Light snow showers",
      icon: 368,
    },
    night: {
      text: "Light snow showers",
      icon: 368,
    },
  },
  {
    code: 1258,
    day: {
      text: "Moderate or heavy snow showers",
      icon: 371,
    },
    night: {
      text: "Moderate or heavy snow showers",
      icon: 371,
    },
  },
  {
    code: 1261,
    day: {
      text: "Light showers of ice pellets",
      icon: 374,
    },
    night: {
      text: "Light showers of ice pellets",
      icon: 374,
    },
  },
  {
    code: 1264,
    day: {
      text: "Moderate or heavy showers of ice pellets",
      icon: 377,
    },
    night: {
      text: "Moderate or heavy showers of ice pellets",
      icon: 377,
    },
  },
  {
    code: 1273,
    day: {
      text: "Patchy light rain with thunder",
      icon: 386,
    },
    night: {
      text: "Patchy light rain with thunder",
      icon: 386,
    },
  },
  {
    code: 1276,
    day: {
      text: "Moderate or heavy rain with thunder",
      icon: 389,
    },
    night: {
      text: "Moderate or heavy rain with thunder",
      icon: 389,
    },
  },
  {
    code: 1279,
    day: {
      text: "Patchy light snow with thunder",
      icon: 392,
    },
    night: {
      text: "Patchy light snow with thunder",
      icon: 392,
    },
  },
  {
    code: 1282,
    day: {
      text: "Moderate or heavy snow with thunder",
      icon: 395,
    },
    night: {
      text: "Moderate or heavy snow with thunder",
      icon: 395,
    },
  },
];

//if I use my own icons i can use this function
export const weatherContidion = (code: number) => {
  const weather = weatherCodes.find((weather) => weather.code === code);
  return weather;
};
