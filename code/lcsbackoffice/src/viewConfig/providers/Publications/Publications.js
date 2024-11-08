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
    CFormTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsPublications } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialPublicationState = {
    content: '',           // Contenu de la publication (texte)
    hashtag: '',           // Hashtag de la publication (texte)
    image_url: '',         // URL de l'image de la publication
    video_url: '',         // URL de la vidéo de la publication
};

const PublicationsC = ({ refresh, selectedPublications }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Publications, setFormdata] = useState(initialPublicationState);

    useEffect(() => {
        setIsUpdateMode(!!selectedPublications);
        setFormdata(selectedPublications || initialPublicationState);
    }, [selectedPublications]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPublications.updatePublications(Publications, Publications.id)
            : await settingsPublications.addPublications(Publications);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialPublicationState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updatePublicationsTitle') : i18n.t('addPublicationsTitle')), [isUpdateMode]);

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
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('contentInputLabel')}</CFormLabel>
                            <CFormTextarea value={Publications.content} onChange={(e) => setFormdata({ ...Publications, content: e.target.value })} id="validationTooltip01" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredContentField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip02">{i18n.t('hashtagInputLabel')}</CFormLabel>
                            <CFormInput value={Publications.hashtag} onChange={(e) => setFormdata({ ...Publications, hashtag: e.target.value })} type="text" id="validationTooltip02" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredHashtagField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('imageUrlInputLabel')}</CFormLabel>
                            <CFormInput value={Publications.image_url} onChange={(e) => setFormdata({ ...Publications, image_url: e.target.value })} type="text" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredImageUrlField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">{i18n.t('videoUrlInputLabel')}</CFormLabel>
                            <CFormInput value={Publications.video_url} onChange={(e) => setFormdata({ ...Publications, video_url: e.target.value })} type="text" id="validationTooltip04" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredVideoUrlField')}
                            </CFormFeedback>
                        </CCol>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                {i18n.t('closeButton')}
                            </CButton>
                            <CButton color="primary" type="submit">
                                {i18n.t('saveButton')}
                            </CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

PublicationsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPublications: PropTypes.object,
};

export default PublicationsC;
