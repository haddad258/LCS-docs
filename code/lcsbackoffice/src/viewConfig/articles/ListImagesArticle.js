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
import { cil3d } from '@coreui/icons';
import { settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
import ImageCardList from 'src/components/Images/Images.Card';
import { API_URLPublicArticles } from 'src/services/Api/config';

const ListImagesArticlesC = ({ refresh, selectedListImagesArticles }) => {
    const [visible, setVisible] = useState(false);
    const [ListImagesArticle, setImagesList] = useState([]);

    const handleAddOrUpdate = async () => {
        try {
            const list = await settingsConfigArticles.getArticlesImages(selectedListImagesArticles.id);
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
            <CButton style={{ backgroundColor: "#8899AE" }} onClick={() => handleAddOrUpdate(!visible)}>
                <CIcon icon={cil3d} />
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
                                    imageSrc={API_URLPublicArticles + selectedListImagesArticles.name + "/" + e.images || "defaultImage.png"} // Replace with the actual image source
                                    title={selectedListImagesArticles.name || "Default Title"}
                                    description={e.description || "Default description."}
                                />
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

ListImagesArticlesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedListImagesArticles: PropTypes.object,
};

export default ListImagesArticlesC;
