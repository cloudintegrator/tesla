import api from "./instance";
import { Medicine } from "../types/medicine";

export async function postMedicine(accessToken: string, payload: Medicine) {
  console.log(accessToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  
  const response = await api.post("/medicines", payload, {
    headers: headers
  });
  console.log(response);
  return response;
}
