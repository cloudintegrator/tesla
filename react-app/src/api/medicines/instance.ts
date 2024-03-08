import axios from "axios";

const api = axios.create({
    baseURL: "https://c219fb60-f3b7-4aca-a7d2-d62a3e1f1a5d-prod.e1-us-east-azure.choreoapis.dev/fwzo/sharemedicinesvc/endpoint-9090-803/v1.0",
  });
  
export default api;