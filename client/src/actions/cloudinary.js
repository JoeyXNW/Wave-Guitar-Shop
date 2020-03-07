import axios from "axios";

export const postImage = (formData, config) => {
  return axios.post("/api/users/uploadimage", formData, config);
};

export const removeImage = id => {
  return axios.get(`/api/users/removeimage?public_id=${id}`);
};
