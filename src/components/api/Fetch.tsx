import axios, { AxiosRequestConfig } from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:3139",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

backendApi.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("token");
  config.headers["x-access-token"] = token ? token : "";
  return config;
});

backendApi.interceptors.response.use(
  (response) => response,
  // If token is expired remove the localStorage values and redirect to login page.
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      location.href = "/login";
    }
    throw error;
  }
);

export { backendApi };
