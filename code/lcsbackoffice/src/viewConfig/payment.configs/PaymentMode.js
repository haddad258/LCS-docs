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
import { settingsPaymentModes } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialPaymentModestate = {
    name: '',
    description: '',
    secretId: '',
    userId: '',
    accountId: '',
    tokenId: '',
    authO: '',
    attributionId: '',
    requestId: '',
};

const PaymentModesC = ({ refresh, selectedPaymentModes }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [PaymentModes, setFormdata] = useState(initialPaymentModestate);

    useEffect(() => {
        setIsUpdateMode(!!selectedPaymentModes);
        setFormdata(selectedPaymentModes || initialPaymentModestate);
    }, [selectedPaymentModes]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPaymentModes.updatePaymentModes(PaymentModes, PaymentModes.id)
            : await settingsPaymentModes.addPaymentModes(PaymentModes);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialPaymentModestate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updatePaymentModesTitle') : i18n.t('addPaymentModesTitle')), [isUpdateMode]);

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
                            <CFormInput value={PaymentModes.name} onChange={(e) => setFormdata({ ...PaymentModes, name: e.target.value })} type="text" id="validationTooltip01" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={PaymentModes.description} onChange={(e) => setFormdata({ ...PaymentModes, description: e.target.value })} type="text" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="secretId">{i18n.t('secretIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.secretId}
                                onChange={(e) => setFormdata({ ...PaymentModes, secretId: e.target.value })}
                                type="text"
                                id="secretId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredSecretIdField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="userId">{i18n.t('userIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.userId}
                                onChange={(e) => setFormdata({ ...PaymentModes, userId: e.target.value })}
                                type="text"
                                id="userId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredUserIdField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="accountId">{i18n.t('accountIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.accountId}
                                onChange={(e) => setFormdata({ ...PaymentModes, accountId: e.target.value })}
                                type="text"
                                id="accountId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredAccountIdField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="tokenId">{i18n.t('tokenIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.tokenId}
                                onChange={(e) => setFormdata({ ...PaymentModes, tokenId: e.target.value })}
                                type="text"
                                id="tokenId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredTokenIdField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="authO">{i18n.t('authOLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.authO}
                                onChange={(e) => setFormdata({ ...PaymentModes, authO: e.target.value })}
                                type="text"
                                id="authO"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredAuthOField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="attributionId">{i18n.t('attributionIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.attributionId}
                                onChange={(e) => setFormdata({ ...PaymentModes, attributionId: e.target.value })}
                                type="text"
                                id="attributionId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredAttributionIdField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="requestId">{i18n.t('requestIdLabel')}</CFormLabel>
                            <CFormInput
                                value={PaymentModes.requestId}
                                onChange={(e) => setFormdata({ ...PaymentModes, requestId: e.target.value })}
                                type="text"
                                id="requestId"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredRequestIdField')}
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

PaymentModesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPaymentModes: PropTypes.object,
};

export default PaymentModesC;
