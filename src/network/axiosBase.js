import axios from "axios";
import { PRODUCTS_GET_API } from "../api/env";

export const axiosInstance = axios.create({
    baseURL: PRODUCTS_GET_API
})