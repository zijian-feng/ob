import service from "..";
import type { RequestPhoneAreaCode, ResponsePhoneAreaCode } from "./types";

export const getPhoneAreaCode = async (params: RequestPhoneAreaCode) => {
  const { app_id, app_secret } = params;
  try {
    const res = await service.get<ResponsePhoneAreaCode>(`/mxnzp-api/phone_code/list?app_id=${app_id}&app_secret=${app_secret}`)

    const { code, data } = await res.json();
    if (code === 1) {
      return data;
    }
    return []
  } catch {
    return []
  }
}
