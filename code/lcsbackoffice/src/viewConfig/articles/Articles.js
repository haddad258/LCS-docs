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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialArticlestate = {
    name: '',
    description: '',
    barcode: '',
    price: 0,
};

const ArticlesC = ({ refresh, selectedArticles }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Articles, setFormdata] = useState(initialArticlestate);

    useEffect(() => {
        setIsUpdateMode(!!selectedArticles);
        setFormdata(selectedArticles || initialArticlestate);
    }, [selectedArticles]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsConfigArticles.updateArticles(Articles, Articles.id)
            : await settingsConfigArticles.addArticles(Articles);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialArticlestate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateArticlesTitle') : i18n.t('addArticlesTitle')), [isUpdateMode]);

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
                            <CFormInput value={Articles.name} onChange={(e) => setFormdata({ ...Articles, name: e.target.value })} type="text" id="validationTooltip01" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={Articles.description} onChange={(e) => setFormdata({ ...Articles, description: e.target.value })} type="text" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">{i18n.t('barcodeInputLabel')}</CFormLabel>
                            <CFormInput value={Articles.barcode} onChange={(e) => setFormdata({ ...Articles, barcode: e.target.value })} type="text" id="validationTooltip04" />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredBarcodeField')}
                            </CFormFeedback>
                        </CCol>
                        
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip05">{i18n.t('priceInputLabel')}</CFormLabel>
                            <CFormInput value={Articles.price} onChange={(e) => setFormdata({ ...Articles, price: e.target.value })} type="number" step="0.01" id="validationTooltip05" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredPriceField')}
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

ArticlesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedArticles: PropTypes.object,
};

export default ArticlesC;
