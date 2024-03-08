import axios, { AxiosResponse } from "axios";
import api from "./instance";
import { Medicine } from "../types/medicine";

export async function getMedicines(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response=await api.get("/medicines",{
    headers:headers
  });
  console.log(response);
  return response as AxiosResponse<Medicine[]>;
}