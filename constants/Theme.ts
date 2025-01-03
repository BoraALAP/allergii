const lBlue100 = "hsl(173, 100%, 90%)";
const lBlue200 = "hsl(173, 100%, 80%)";
const lBlue300 = "hsl(173, 100%, 70%)";
const lBlue400 = "hsl(173, 100%, 60%)";
const lBlue500 = "hsl(173, 100%, 50%)";
const lBlue600 = "hsl(173, 100%, 40%)";
const lBlue700 = "hsl(173, 100%, 30%)";
const lBlue800 = "hsl(173, 100%, 20%)";
const lBlue900 = "hsl(173, 100%, 10%)";

const blue100 = "hsl(192, 100%, 90%)";
const blue200 = "hsl(192, 100%, 80%)";
const blue300 = "hsl(192, 100%, 70%)";
const blue400 = "hsl(192, 100%, 60%)";
const blue500 = "hsl(192, 100%, 50%)";
const blue600 = "hsl(192, 100%, 40%)";
const blue700 = "hsl(192, 100%, 30%)";
const blue800 = "hsl(192, 100%, 20%)";
const blue900 = "hsl(192, 100%, 10%)";

const green100 = "hsl(101, 100%, 90%)";
const green200 = "hsl(101, 100%, 80%)";
const green300 = "hsl(101, 100%, 70%)";
const green400 = "hsl(101, 100%, 60%)";
const green500 = "hsl(101, 100%, 50%)";
const green600 = "hsl(101, 100%, 40%)";
const green700 = "hsl(101, 100%, 30%)";
const green800 = "hsl(101, 100%, 20%)";
const green900 = "hsl(101, 100%, 10%)";

const red100 = "hsl(0, 100%, 90%)";
const red200 = "hsl(0, 100%, 80%)";
const red300 = "hsl(0, 100%, 70%)";
const red400 = "hsl(0, 100%, 60%)";
const red500 = "hsl(0, 100%, 50%)";
const red600 = "hsl(0, 100%, 40%)";
const red700 = "hsl(0, 100%, 30%)";
const red800 = "hsl(0, 100%, 20%)";
const red900 = "hsl(0, 100%, 10%)";

const purple100 = "hsl(268, 100%, 90%)";
const purple200 = "hsl(268, 100%, 80%)";
const purple300 = "hsl(268, 100%, 70%)";
const purple400 = "hsl(268, 100%, 60%)";
const purple500 = "hsl(268, 100%, 50%)";
const purple600 = "hsl(268, 100%, 40%)";
const purple700 = "hsl(268, 100%, 30%)";
const purple800 = "hsl(268, 100%, 20%)";
const purple900 = "hsl(268, 100%, 10%)";

// Sunset Orange Scale

const orange900 = "hsl(32, 100%, 10%)";
const orange800 = "hsl(32, 100%, 20%)";
const orange700 = "hsl(32, 100%, 30%)";
const orange600 = "hsl(32, 100%, 40%)";
const orange500 = "hsl(32, 100%, 50%)";
const orange400 = "hsl(32, 100%, 60%)";
const orange300 = "hsl(32, 100%, 70%)";
const orange200 = "hsl(32, 100%, 80%)";
const orange100 = "hsl(32, 100%, 90%)";

//  Grey Scale

const black = "hsl(0, 0%, 0%)";
const grey950 = "hsl(0, 0%, 5%)";
const grey900 = "hsl(0, 0%, 10%)";
const grey850 = "hsl(0, 0%, 15%)";
const grey800 = "hsl(0, 0%, 20%)";
const grey750 = "hsl(0, 0%, 25%)";
const grey700 = "hsl(0, 0%, 30%)";
const grey650 = "hsl(0, 0%, 35%)";
const grey600 = "hsl(0, 0%, 40%)";
const grey500 = "hsl(0, 0%, 50%)";
const grey400 = "hsl(0, 0%, 60%)";
const grey350 = "hsl(0, 0%, 65%)";
const grey300 = "hsl(0, 0%, 70%)";
const grey250 = "hsl(0, 0%, 75%)";
const grey200 = "hsl(0, 0%, 80%)";
const grey150 = "hsl(0, 0%, 85%)";
const grey100 = "hsl(0, 0%, 90%)";
const grey50 = "hsl(0, 0%, 95%)";
const white = "hsl(0, 0%, 100%)";

//generate types for global and color objects

export const global: GlobalType = {
  font: {
    size: {
      xs: "11px",
      sm: "13px",
      base: "15px",
      lg: "16px",
      xl: "18px",
      xxl: "20px",
      pageTitle: "22px",
      sectionTitle: "14px",
      value: "20px",
      largeValue: "26px",
      bigNumber: "36px",
    },
    weight: {
      light: "300",
      normal: "400",
      medium: "500",
      bold: "700",
      extraBold: "800",
    },
    family: {
      primary: "PragatiNarrow_400Regular",
      primaryBold: "PragatiNarrow_700Bold",
      secondary: "Lato_400Regular",
      secondaryBold: "Lato_700Bold",
    },
  },
  border: {
    radius: {
      circle: "1000px",
      button: "8px",
      card: "16px",
      modal: "32px",
      input: "8px",
    },
  },
  colors: {
    splash: {
      start: blue800,
      end: lBlue800,
    },
  },
};

export const light: ColorType = {
  dark: false,
  ...(global as GlobalType),
  colors: {
    primary: black,
    secondary: orange700,
    soft: grey200,
    invert: white,
    value: black,
    sectionTitle: grey800,
    divider: grey150,
    text: {
      primary: black,
      heading: black,
      body: grey700,
      invert: white,
      soft: grey200,
      disabled: grey400,
    },
    tabBar: {
      default: {
        icon: grey800,
        text: grey800,
      },
      selected: {
        icon: orange700,
        text: orange700,
      },
    },
    tint: {
      active: grey900,
      text: grey900,
    },
    slider: {
      base: orange400,
      thumb: black,
      track: orange700,
    },
    page: {
      bg: {
        start: white,
        end: grey50,
      },
    },
    modal: {
      bg: grey50,
    },

    card: {
      border: grey100,
      background: white,
      disabled: {
        border: grey150,
        background: grey50,
      },
    },
    input: {
      border: grey800,
      placeholder: grey600,
    },

    button: {
      bg: {
        primary: { default: lBlue800, active: lBlue900 },
        secondary: { default: orange500, active: orange600 },
        tertiary: { default: purple500, active: purple600 },
        disabled: { default: grey400, active: grey600 },
      },
      border: {
        secondary: grey600,
        nav: grey200,
        disabled: grey400,
      },
      text: {
        primary: grey50,
        secondary: grey900,
        tertiary: grey900,
        disabled: grey900,
      },
    },
    inSeason: {
      true: green500,
      false: red500,
    },
    level: {
      low: blue500,
      normal: green600,
      medium: orange500,
      high: red400,
      extreme: red800,
    },
    chart: {
      bottom: lBlue500,
      middle: blue500,
      top: orange500,
      line1: grey700,
      line2: grey500,
      bar: {
        bg: grey50,
        low: blue300,
        medium: orange300,
        high: red300,
      },
    },
    icon: {
      yellow: orange400,
      lightBlue: blue400,
      blue: blue600,
      darkBlue: blue800,
    },
  },
};

export const dark: ColorType = {
  dark: true,
  ...(global as GlobalType),
  colors: {
    page: {
      bg: {
        start: black,
        end: grey950,
      },
    },
    modal: {
      bg: grey900,
    },
    tabBar: {
      default: {
        icon: grey200,
        text: grey200,
      },
      selected: {
        icon: orange200,
        text: orange200,
      },
    },
    primary: white,
    secondary: orange200,
    soft: grey700,
    invert: grey900,
    value: white,
    sectionTitle: grey200,
    divider: grey750,
    text: {
      primary: white,
      heading: white,
      body: grey150,
      invert: grey900,
      soft: grey700,
      disabled: grey400,
    },
    tint: {
      active: grey100,
      text: grey100,
    },
    slider: {
      base: orange800,
      thumb: white,
      track: orange400,
    },
    card: {
      border: grey900,
      background: grey950,
      disabled: {
        border: grey850,
        background: grey950,
      },
    },
    input: {
      border: grey300,
      placeholder: grey400,
    },

    button: {
      bg: {
        primary: { default: lBlue300, active: lBlue100 },
        secondary: { default: orange500, active: orange600 },
        tertiary: { default: purple500, active: purple600 },
        disabled: { default: grey600, active: grey400 },
      },
      border: {
        secondary: grey400,
        nav: grey700,
        disabled: grey600,
      },
      text: {
        primary: grey950,
        secondary: grey100,
        tertiary: grey100,
        disabled: grey100,
      },
    },
    inSeason: {
      true: green500,
      false: red500,
    },
    level: {
      low: blue500,
      normal: green400,
      medium: orange500,
      high: red600,
      extreme: red200,
    },
    chart: {
      bottom: lBlue600,
      middle: blue600,
      top: orange600,
      line1: grey300,
      line2: grey500,
      bar: {
        bg: grey950,
        low: blue600,
        medium: orange600,
        high: red600,
      },
    },

    icon: {
      yellow: orange400,
      lightBlue: blue300,
      blue: blue600,
      darkBlue: blue800,
    },
  },
};

type GlobalType = {
  font: {
    size: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      xxl: string;
      pageTitle: string;
      sectionTitle: string;
      value: string;
      largeValue: string;
      bigNumber: string;
    };
    weight: {
      light: string;
      normal: string;
      medium: string;
      bold: string;
      extraBold: string;
    };
    family: {
      primary: string;
      primaryBold: string;
      secondary: string;
      secondaryBold: string;
    };
  };
  border: {
    radius: {
      circle: string;
      button: string;
      card: string;
      modal: string;
      input: string;
    };
  };
  colors: {
    splash: {
      start: string;
      end: string;
    };
  };
};

export type ColorType = {
  dark: boolean;

  colors: {
    primary: string;
    secondary: string;
    soft: string;
    invert: string;
    value: string;
    sectionTitle: string;
    divider: string;
    text: {
      heading: string;
      primary: string;
      body: string;
      invert: string;
      soft: string;
      disabled: string;
    };
    tabBar: {
      default: {
        icon: string;
        text: string;
      };
      selected: {
        icon: string;
        text: string;
      };
    };
    tint: {
      active: string;
      text: string;
    };
    page: {
      bg: {
        start: string;
        end: string;
      };
    };
    modal: {
      bg: string;
    };
    slider: {
      base: string;
      thumb: string;
      track: string;
    };
    card: {
      border: string;
      background: string;
      disabled: {
        border: string;
        background: string;
      };
    };
    input: {
      border: string;
      placeholder: string;
    };
    button: {
      bg: {
        primary: {
          default: string;
          active: string;
        };
        secondary: {
          default: string;
          active: string;
        };
        tertiary: {
          default: string;
          active: string;
        };
        disabled: {
          default: string;
          active: string;
        };
      };
      border: {
        secondary: string;
        nav: string;
        disabled: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
      };
    };
    inSeason: {
      true: string;
      false: string;
    };
    level: {
      low: string;
      normal: string;
      medium: string;
      high: string;
      extreme: string;
    };
    chart: {
      bottom: string;
      middle: string;
      top: string;
      line1: string;
      line2: string;
      bar: {
        bg: string;
        low: string;
        medium: string;
        high: string;
      };
    };
    icon: {
      yellow: string;
      lightBlue: string;
      blue: string;
      darkBlue: string;
    };
  };
};
