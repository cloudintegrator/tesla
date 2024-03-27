import { AxiosResponse } from "axios";
import api from "./instance";
import { Medicine } from "../types/medicine";

export async function getMedicines(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params = {
    token: accessToken,
  };

  const response = await api
    .get("/medicines", {
      headers: headers,
      params: params,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  return response as AxiosResponse<Medicine[]>;
}
