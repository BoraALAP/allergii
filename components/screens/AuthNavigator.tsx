import React, { useState } from "react";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotScreen from "./ForgotScreen";

export type PageState = "signin" | "signup" | "forgot" | "reset" | "verify";

const AuthNavigator = () => {
  const [page, setPage] = useState<PageState>("signin");
  switch (page) {
    case "signin":
      return <SignInScreen setPage={setPage} />;
    case "signup":
      return <SignUpScreen setPage={setPage} />;
    case "forgot":
      return <ForgotScreen setPage={setPage} />;
    default:
      break;
  }
};

export default AuthNavigator;
