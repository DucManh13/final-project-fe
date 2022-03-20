import axios from "axios";
import { API_URL } from "../config";

const axiosService = axios.create({
  baseURL: `${API_URL}`,
  headers: { "Content-Type": "application/json" },
});

export function postInfo(url, data, callback, errorCallback) {
  axiosService
    .post(url, data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}
export function getInfo(url, callback, errorCallback) {
  axiosService
    .get(url)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}
export function putInfo(url, data, callback, errorCallback) {
  axiosService
    .put(url,data)
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
}
