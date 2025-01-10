import axios from "axios";

export const axiosInstanceApi = () => {
  const token = window.localStorage.getItem("currentUser");

  return axios.create({
    baseURL: "https://sample-backend-15ml.onrender.com/api",
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : ""
    }
  });
};
