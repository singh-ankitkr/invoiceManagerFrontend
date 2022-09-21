import { createContext } from "react";

export const AuthContext = createContext({
  user: {
    email: "",
    name: "",
  },
  isLoggedIn: false,
  token: "",
  authDispatch: ({}) => {},
});
