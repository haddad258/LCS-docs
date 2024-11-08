import { Alert } from "react-native";
import api from "../Api/api";
import { Apis } from "../Api/config";
const getProfilesDisponible = async (id) => {
  try {
    let result = await api.get(Apis.API_ProfilesDisponible);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    return null;
  }
};

export default {

  getProfilesDisponible,
};
