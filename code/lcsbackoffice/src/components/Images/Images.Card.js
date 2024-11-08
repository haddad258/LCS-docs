// ImageCard.js
import React from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCardImage,
    CCardTitle,
    CCardText
} from '@coreui/react';
import PropTypes from 'prop-types';

const ImageCardList = ({ imageSrc, title, description }) => {
    return (
        <CCard className="mb-4" style={{ width: '18rem' }}>
            <CCardHeader>
                <strong>{title}</strong> <small> {description} </small>
            </CCardHeader>
            <CCardBody>
                <CCardImage orientation="top" src={imageSrc} />
                <CCardBody>
                    <CCardTitle>{title}</CCardTitle>
                    <CCardText>
                        {description}
                    </CCardText>
                </CCardBody>
            </CCardBody>
        </CCard>
    );
};

ImageCardList.propTypes = {
    imageSrc: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    
};


export default ImageCardList;
