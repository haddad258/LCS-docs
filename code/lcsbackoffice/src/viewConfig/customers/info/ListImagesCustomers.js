import React, { useState } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCol,
    CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilMediaEject } from '@coreui/icons';
import { settingsCustomers } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
import ImageCardList from 'src/components/Images/Images.Card';
import { API_URLPublicCustomers } from 'src/services/Api/config';
// import RcNNDetection from './RCNN.face';

const ListImagesCustomersC = ({ refresh, selectedListImagesCustomers }) => {
    const [visible, setVisible] = useState(false);
    const [ListImagesArticle, setImagesList] = useState([]);

    const handleAddOrUpdate = async () => {
        try {
            const list = await settingsCustomers.getCustomersImages(selectedListImagesCustomers.id);
            if (list) {
                setImagesList(list?.data);
                console.log(list.data);
                setVisible(!visible);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };

    return (
        <>
            <CButton style={{ backgroundColor: "#fc17fc" }} onClick={() => handleAddOrUpdate(!visible)}>
                <CIcon icon={cilMediaEject} />
            </CButton>

            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{i18n.t("addListImagesArticleTitle")}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {ListImagesArticle?.map((e, index) => (
                            <CCol key={index.toString()} xs={12} md={4}>
                                <ImageCardList
                                    imageSrc={API_URLPublicCustomers  + e.images || "defaultImage.png"} // Replace with the actual image source
                                    title={selectedListImagesCustomers.name || "CustomerImages Title"}
                                    description={e.description || "CustomerImages description."}
                                />
                                {/* <RcNNDetection imageCustomerurl={API_URLPublicCustomers  + e.images} /> */}
                        </CCol>
                        ))}
                    </CRow>

                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            {i18n.t('closeButton')}
                        </CButton>
                    </CModalFooter>
                </CModalBody>
            </CModal>
        </>
    );
};

ListImagesCustomersC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedListImagesCustomers: PropTypes.object,
};

export default ListImagesCustomersC;
