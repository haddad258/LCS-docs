import { Alert } from "react-native";
import api from "../Api/api";
import { Apis } from "../Api/config";

const createNewOrderNewSubscription = async (data) => {
  try {
    let result = await api.post(Apis.Api_NewOrderNewSubscription, data);
    if (result.data.error) {
      return {
        data: null,
      };
    }
    return {
      status: "access",
      data: result.data,
    };
  } catch (error) {
    console.log("error.response.data",error.response.code)
    return {
      data: null,
      errors:error.response.data
    };
  }
};
const createNewOrderOldSubscription = async (id, data) => {
  try {
    let result = await api.post(Apis.Api_NewOrderOldSubscription, data);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
const getOrdres = async (id, data) => {
  try {
    console.log(Apis.api_getordres)
    let result = await api.get(Apis.api_getordres, data);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
export default {
  createNewOrderNewSubscription,
  createNewOrderOldSubscription,
  getOrdres
};
