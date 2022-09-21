import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  useEffect,
  useReducer,
} from "react";
import { backendApi } from "../api/Fetch";
import { AuthContext } from "./authContext";

export const initialDetails = {
  user: {
    email: "",
    name: "",
  },
  isLoggedIn: false,
  token: "",
};

export const reducerFunction = (state: any, action: any) => {
  switch (action.type) {
    case "INIT":
      console.log("Initialize");
      // Get loginDetails from localStorage
      const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true" ? true : false;

      console.log(isLoggedIn);

      if (isLoggedIn) {
        const loginDetails = {
          user: {
            email: localStorage.getItem("email"),
            name: localStorage.getItem("name"),
          },
          isLoggedIn: true,
          token: localStorage.getItem("token"),
        };

        // If company-details are not set, redirect to company-details form page.
        const fetchCompanyDetails = async () => {
          const response = await backendApi.get("/me");
          if (response.status === 200) {
            if (
              response.data["companyDetails"] === null &&
              action.router.pathname !== "/company-details"
            ) {
              action.router.push("/company-details");
              // Todo - Add a toast message that "before proceeding fill in the company-details"
            } else {
              if (["/signup", "/login"].includes(action.router.pathname)) {
                action.router.push("/");
              }
            }
          }
        };
        fetchCompanyDetails();

        return loginDetails;
      }
      // if no details then set the value as required by logout
      //  and redirect to login page.
      if (!["/signup", "/login"].includes(action.router.pathname)) {
        action.router.push("/login");
      }
      return initialDetails;

    case "LOGIN":
      console.log("after Login");
      // Call the api to Login.
      const details = {
        user: {
          email: action.loginData.email,
          name: action.loginData.name,
        },
        isLogged: true,
        token: action.loginData.token,
      };
      //   set the localStorage
      localStorage.setItem("name", action.loginData.name);
      localStorage.setItem("email", action.loginData.email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", action.loginData.token);
      console.log(action.loginData);

      action.router.push("/");
      return {
        ...state,
        user: {
          email: action.loginData.email,
          name: action.loginData.name,
        },
        isLoggedIn: true,
        token: action.loginData.token,
      };

    case "LOGOUT":
      console.log("Logout");
      // Call the logout api.
      // remove values from localstorage
      // change the state to value for logout
      // redirect to login page.
      return state;
    default:
      return state;
  }
};

export const AuthChecker = (props: {
  children:
    | ReactElement<string | JSXElementConstructor<any>>
    | ReactFragment
    | null
    | undefined;
}) => {
  const [loginDetails, dispatch] = useReducer(reducerFunction, initialDetails);
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    // Initialized on each page change.
    dispatch({ type: "INIT", router });
  }, [props]);

  return (
    <AuthContext.Provider value={{ ...loginDetails, authDispatch: dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
