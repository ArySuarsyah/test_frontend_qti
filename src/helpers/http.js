import axios from "axios";
import https from "https";
const http = (token) => {
  // axios.defaults.httpsAgent = new https.Agent({
  //   rejectUnauthorized: false,
  // });
  const headers = {};
  if (token) {
    headers.authorization = "Bearer " + token;
  }

  const instance = axios.create({
    baseURL: "https://be-ksp.analitiq.id",
    headers,
  });
  return instance;
};

export default http;
