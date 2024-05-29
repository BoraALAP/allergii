type ValueColorProps = {
  value: number;
  type?:
    | "speed"
    | "rain"
    | "temp"
    | "default"
    | "visibility"
    | "pollen"
    | "chance"
    | "co"
    | "no2"
    | "o3"
    | "pm10"
    | "pm25"
    | "so2"
    | "scale";
};

export const ValueColor = ({ value, type }: ValueColorProps) => {
  switch (type) {
    case "speed":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }

    case "rain":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 15) {
        return "medium";
      } else if (value > 5) {
        return "normal";
      } else {
        return "low";
      }

    case "temp":
      if (value < -10 || value > 30) {
        return "extreme";
      } else if (value < -5 || value > 20) {
        return "high";
      } else if (value < 0 || value > 15) {
        return "medium";
      } else if (value < 5 || value > 10) {
        return "normal";
      } else {
        return "low";
      }

    case "visibility":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "co":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "no2":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "o3":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "pm10":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "pm25":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "so2":
      if (value > 40) {
        return "extreme";
      } else if (value > 30) {
        return "high";
      } else if (value > 20) {
        return "medium";
      } else if (value > 10) {
        return "normal";
      } else {
        return "low";
      }
    case "chance":
      if (value > 100) {
        return "extreme";
      } else if (value > 70) {
        return "high";
      } else if (value > 40) {
        return "medium";
      } else if (value > 20) {
        return "normal";
      } else {
        return "low";
      }
    case "pollen":
      if (value === 5) {
        return "extreme";
      } else if (value === 4) {
        return "high";
      } else if (value === 3) {
        return "medium";
      } else if (value === 2) {
        return "normal";
      } else {
        return "low";
      }

    case "scale":
      if (value >= 4) {
        return "extreme";
      } else if (value === 3) {
        return "high";
      } else if (value === 2) {
        return "medium";
      } else {
        return "low";
      }
  }
};
