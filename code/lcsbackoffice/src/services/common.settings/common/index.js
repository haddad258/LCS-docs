import api from '../../Api/api';
import { ApisCommon } from '../../Api/configCommon';


const updateTableStatus = async (data) => {
    try {
        const result = await api.put(ApisCommon.api_update_status_row,data);
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const getFilterData = async (filerId,entity,filerAttr)  => {
    try {
        const result = await api.post(ApisCommon.api_get_filer_row,{
            entity:entity,
            filerAttr:filerAttr,
            filerId:filerId
        });
        return result.data.error ? null : result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const CommonEntity = {
    updateTableStatus,
    getFilterData
};

export default CommonEntity;
