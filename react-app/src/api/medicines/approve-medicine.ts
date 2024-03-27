import api from "./instance";
import { Medicine } from "../types/medicine";

export async function approveMedicine(
  accessToken: string,
  payload: Medicine | null
) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log(payload);
  const response = await api
    .post("/approve", payload, {
      headers: headers,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  return response;
}
