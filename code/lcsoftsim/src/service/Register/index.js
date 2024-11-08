import { Alert } from "react-native";
import api from "../Api/api";
import { Apis } from "../Api/config";
import Toast from 'react-native-simple-toast';
const showToast = message => {
  Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
};
const getCustomerById = async (id) => {
  try {
    let result = await api.get(Apis.API_getCustomer);
    if (result.data.error) {
      return null;
    }
    return result.data;
  } catch (error) {
    return null;
  }
};
const RegisterCustomer = async (data) => {
  try {
    let result = await api.post(Apis.Api_RegisterCustomer, data);
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
    showToast("faild")
    alert("failed")
    return {
      status: error,
      errors: error.response.data
    };
  }
};
const updateCustomer = async (data) => {
  try {
    let result = await api.put(Apis.API_updateCustomer, data);
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
  RegisterCustomer,
  updateCustomer,
  getCustomerById,
};
