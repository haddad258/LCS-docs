
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
import { settingsPaymentCards } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialPaymentCardState = {
    cardholder_name: '',
    card_number_token: '',
    expiration_date: '',
    card_type: '',
    billing_address: '',
};

const PaymentCardsC = ({ refresh, selectedPaymentCards }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [paymentCardData, setFormdata] = useState(initialPaymentCardState);

    useEffect(() => {
        setIsUpdateMode(!!selectedPaymentCards);
        setFormdata(selectedPaymentCards || initialPaymentCardState);
    }, [selectedPaymentCards]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPaymentCards.updatePaymentCards(paymentCardData, paymentCardData.id)
            : await settingsPaymentCards.addPaymentCards(paymentCardData);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialPaymentCardState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updatePaymentCardsTitle') : i18n.t('addPaymentCardsTitle')), [isUpdateMode]);

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
                            <CFormLabel htmlFor="cardholderName">{i18n.t('cardholderNameLabel')}</CFormLabel>
                            <CFormInput
                                value={paymentCardData.cardholder_name}
                                onChange={(e) => setFormdata({ ...paymentCardData, cardholder_name: e.target.value })}
                                type="text"
                                id="cardholderName"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredCardholderName')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="cardNumber">{i18n.t('cardNumberLabel')}</CFormLabel>
                            <CFormInput
                                value={paymentCardData.card_number_token}
                                onChange={(e) => setFormdata({ ...paymentCardData, card_number_token: e.target.value })}
                                type="text"
                                id="cardNumber"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredCardNumber')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="expirationDate">{i18n.t('expirationDateLabel')}</CFormLabel>
                            <CFormInput
                                value={paymentCardData.expiration_date}
                                onChange={(e) => setFormdata({ ...paymentCardData, expiration_date: e.target.value })}
                                type="text"
                                id="expirationDate"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredExpirationDate')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="cardType">{i18n.t('cardTypeLabel')}</CFormLabel>
                            <CFormInput
                                value={paymentCardData.card_type}
                                onChange={(e) => setFormdata({ ...paymentCardData, card_type: e.target.value })}
                                type="text"
                                id="cardType"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredCardType')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="billingAddress">{i18n.t('billingAddressLabel')}</CFormLabel>
                            <CFormInput
                                value={paymentCardData.billing_address}
                                onChange={(e) => setFormdata({ ...paymentCardData, billing_address: e.target.value })}
                                type="text"
                                id="billingAddress"
                            />
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

PaymentCardsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPaymentCards: PropTypes.object,
};

export default PaymentCardsC;
