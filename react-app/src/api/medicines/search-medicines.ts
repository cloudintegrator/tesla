import { AxiosResponse } from "axios";
import api from "./instance";
import { Medicine } from "../types/medicine";

export async function search(accessToken: string, medicine_name: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params = {
    token: accessToken,
    medicine_name: medicine_name,
  };

  const response = await api
    .get("/search", {
      headers: headers,
      params: params,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  return response as AxiosResponse<Medicine[]>;
}
