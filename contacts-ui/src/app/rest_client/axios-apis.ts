import axios from "axios";

const baseURL = "http://localhost:8080/contacts/v1";

export const api = axios.create({baseURL});