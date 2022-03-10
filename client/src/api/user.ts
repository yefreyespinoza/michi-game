import axios from "axios";
import config from "../config/config";

export const getUser = async (id: string) => {
  const res = await axios.get(`${config.API}/api/user/${id}`);
  return await res.data;
};
