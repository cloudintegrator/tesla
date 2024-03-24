import api from "./instance";
import { Medicine } from "../types/medicine";

export async function pickMedicine(accessToken: string, payload: Medicine|null) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log(payload);
  const response = await api.post("/pick", payload, {
    headers: headers
  });
  console.log(response);
  return response;
}
