import api from "./instance";
import { Medicine } from "../types/medicine";

export async function postMedicine(accessToken: string, payload: Medicine) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params = {
    token: accessToken,
  };

  const response = await api.post("/medicines", payload, {
    headers: headers,
    params: params,
  });
  console.log(response);
  return response;
}
