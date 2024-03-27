import api from "./instance";
import { Medicine } from "../types/medicine";

export async function postMedicine(accessToken: string, payload: Medicine) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  console.log(payload);
  const response = await api
    .post("/medicines", payload, {
      headers: headers,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(response);
  return response;
}
