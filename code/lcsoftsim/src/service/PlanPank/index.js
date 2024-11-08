import { Alert } from "react-native";
import api from "../Api/api";
import { Apis } from "../Api/config";
const getPlanPack = async (id, data) => {
  try {

    let result = await api.get(Apis.API_PlanPack);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
const getPlanPackbyCategory = async (id,) => {
  try {

    let result = await api.get(Apis.API_PlanPackCategorie+id);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
const getProduct = async (id) => {
  try {

    let result = await api.get(Apis.API_Product_PlanPack+id);
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
  getPlanPack,
  getPlanPackbyCategory,
  getProduct
};
