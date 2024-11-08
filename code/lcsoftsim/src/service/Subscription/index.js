import { Alert } from "react-native";
import api from "../Api/api";
import { Apis } from "../Api/config";
const getSubscriptions = async () => {
  try {
    let result = await api.get(Apis.Api_getSubscriptions);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    return null;
  }
};

export default {
  getSubscriptions,
};
