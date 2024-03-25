import api from "./instance";
import { Medicine } from "../types/medicine";

export async function deleteMedicine(accessToken: string, payload: Medicine|null) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log(payload);
  const response = await api.post("/deletemed", payload, {
    headers: headers
  });
  console.log(response);
  return response;
}
