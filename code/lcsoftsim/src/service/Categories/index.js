import api from "../Api/api";
import { Apis } from "../Api/config";
const getCategories = async () => {
    try {
        console.log(Apis.api_Categories)
        const result = await api.get(Apis.api_Categories);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



const CategorieFun = {
    getCategories,

};

export default CategorieFun;
