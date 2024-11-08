import React from 'react';

import PropTypes from 'prop-types';
import { API_URLPublic } from 'src/services/Api/config';


const ImagesDetailsC = ({  selectedImagesConfigs, type }) => {


    return (
        <>

              
            <img
                style={{
                    width: "40%",
                    height: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                    margin:"10%"
                }}
                src={API_URLPublic +type+"/"+ selectedImagesConfigs?.images}
                alt="preview"
            />

        </>
    );
};

ImagesDetailsC.propTypes = {
    selectedImagesConfigs: PropTypes.object,
    type: PropTypes.string,
};

export default ImagesDetailsC;
