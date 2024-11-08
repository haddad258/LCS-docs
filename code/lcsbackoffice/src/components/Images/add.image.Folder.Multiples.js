import React, { useState, useEffect } from 'react';
import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CCol,
    CFormLabel,
    CFormFeedback,
    CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';
import { settingsImagesConfig } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialImagesConfigState = {
    image: null,
};

const ImagesConfigsMutiplesC = ({ refresh, selectedImagesConfigs, type }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [ImagesConfigsData, setFormData] = useState(initialImagesConfigState);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        setFormData(selectedImagesConfigs || initialImagesConfigState);
    }, [selectedImagesConfigs]);

    const handleAddOrUpdate = async () => {
        const formData = new FormData();
        console.log(ImagesConfigsData)
        formData.append('type', type);
        if (selectedImagesConfigs?.id) {
            formData.append('identity', selectedImagesConfigs.id);
        }
        if (selectedImagesConfigs?.name) {
            formData.append('folder', selectedImagesConfigs.name);
        }
        if (selectedImagesConfigs?.id) {
            formData.append('images', selectedImagesConfigs.id+Math.floor(Math.random() * 1000));
        }
        if (file) {
            formData.append('file', file);
        }

        try {
            const result = await settingsImagesConfig.addImagesConfigsMultiples(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (result) {
                setVisible(false);
                setValidated(false);
                setFormData(initialImagesConfigState);
                refresh();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            handleAddOrUpdate();
        }
    };

    const newDataImagesConfigs = () => {
        setFormData(selectedImagesConfigs || initialImagesConfigState);
        setVisible(!visible);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <>
            <CButton style={{backgroundColor:"#561172"}} onClick={() => newDataImagesConfigs()}>
                <CIcon icon={cilImage} />
            </CButton>

            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{i18n.t('importImageTitle')}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="imageUpload">{i18n.t('uploadImageText')}</CFormLabel>
                            <CFormInput
                                type="file"
                                id="imageUpload"
                                onChange={handleFileChange}
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredImageField')}
                            </CFormFeedback>
                        </CCol>

                        {image && (
                            <CCol md={12} className="position-relative">
                                <img
                                    style={{
                                        width: "180px",
                                        height: "180px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    src={image}
                                    alt="preview"
                                />
                            </CCol>
                        )}

                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                {i18n.t('closeButton')}
                            </CButton>
                            <CButton color="primary" type="submit">{i18n.t('saveButton')}</CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

ImagesConfigsMutiplesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedImagesConfigs: PropTypes.object,
    type: PropTypes.string,
};

export default ImagesConfigsMutiplesC;
