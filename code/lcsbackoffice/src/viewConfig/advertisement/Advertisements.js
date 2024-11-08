import React, { useState, useEffect, useMemo } from 'react';
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
    CFormSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsConfigApps } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialAdvertisementState = {
    name: '',
    content: '',  // Updated to include content
    type: 'percentage', // Default to percentage
    images: '',  // Updated to include images
};

const AdvertisementsC = ({ refresh, selectedAdvertisements }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Advertisements, setFormdata] = useState(initialAdvertisementState);

    useEffect(() => {
        setIsUpdateMode(!!selectedAdvertisements);
        setFormdata(selectedAdvertisements || initialAdvertisementState);
    }, [selectedAdvertisements]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsConfigApps.updateConfigApps(Advertisements, "entity/advertisements/" + Advertisements.id)
            : await settingsConfigApps.addConfigApps(Advertisements, "entity/advertisements");

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialAdvertisementState);
            refresh();
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateAdvertisementsTitle') : i18n.t('addAdvertisementsTitle')), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={() => setVisible(!visible)}>
                <CIcon icon={isUpdateMode ? cilPen : cilPlus} />
            </CButton>

            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('nameInputLabel')}</CFormLabel>
                            <CFormInput 
                                value={Advertisements.name} 
                                onChange={(e) => setFormdata({ ...Advertisements, name: e.target.value })} 
                                type="text" 
                                id="validationTooltip01" 
                                required 
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationContent">{i18n.t('contentInputLabel')}</CFormLabel>
                            <CFormInput 
                                value={Advertisements.content} 
                                onChange={(e) => setFormdata({ ...Advertisements, content: e.target.value })} 
                                type="text" 
                                id="validationContent" 
                                required 
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredContentField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationType">{i18n.t('typeInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={Advertisements.type}
                                onChange={(e) => setFormdata({ ...Advertisements, type: e.target.value })}
                                id="validationType"
                                required
                            >
                                <option value="popup">{i18n.t('popup')}</option>
                                <option value="web">{i18n.t('web')}</option>
                                <option value="mobile">{i18n.t('mobile')}</option>
                            </CFormSelect>
                            <CFormFeedback tooltip invalid>{i18n.t('requiredTypeField')}</CFormFeedback>
                        </CCol>

                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationImages">{i18n.t('imagesInputLabel')}</CFormLabel>
                            <CFormInput 
                                value={Advertisements.images} 
                                onChange={(e) => setFormdata({ ...Advertisements, images: e.target.value })} 
                                type="text" 
                                id="validationImages" 
                                required 
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredImagesField')}
                            </CFormFeedback>
                        </CCol>

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

AdvertisementsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedAdvertisements: PropTypes.object,
};

export default AdvertisementsC;
