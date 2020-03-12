import axios from "axios";
import { GET_SITE_INFO, UPDATE_SITE_INFO } from "./types";
import { SITE_SERVER } from "../components/utils/misc";

export function getSiteInfo() {
  let request = axios.get(`${SITE_SERVER}/site_data`).then(res => res.data);

  return { type: GET_SITE_INFO, payload: request };
}

export function updateSiteInfo(dataToSubmit) {
  let request = axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then(res => res.data);

  return { type: UPDATE_SITE_INFO, payload: request };
}
