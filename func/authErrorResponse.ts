type AuthError =
  | "auth/invalid-email"
  | "auth/user-disabled"
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/email-already-in-use"
  | "auth/operation-not-allowed"
  | "auth/weak-password"
  | "auth/requires-recent-login"
  | "auth/invalid-credential"
  | "auth/network-request-failed";

export const handleAuthError = (code: any) => {
  switch (code) {
    case "auth/invalid-email":
      return "The email address is not valid.";

    case "auth/user-disabled":
      return "The user corresponding to the given email has been disabled.";

    case "auth/user-not-found":
      return "There is no user corresponding to the given email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "The password is invalid for the given email.";

    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";

    case "auth/operation-not-allowed":
      return "The type of account corresponding to the given email is not enabled.";

    case "auth/weak-password":
      return "The password is not strong enough.";

    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Log in again before retrying this request.";

    case "auth/network-request-failed":
      return "A network error has occurred.";

    default:
      return "An unknown error occurred.";
  }
};
