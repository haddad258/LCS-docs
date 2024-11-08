
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
const initialDiscountstate = {
    name: '',
    description: '',
    type: 'percentage', // Default to percentage
    value: 0,
    start_date: '',
    end_date: '',
    active: true, // Default to active
};
const DiscountsC = ({ refresh, selectedDiscounts }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Discounts, setFormdata] = useState(initialDiscountstate);

    useEffect(() => {
        setIsUpdateMode(!!selectedDiscounts);
        setFormdata(selectedDiscounts || initialDiscountstate);
    }, [selectedDiscounts]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsConfigApps.updateConfigApps(Discounts, "entity/discounts/" + Discounts.id)
            : await settingsConfigApps.addConfigApps(Discounts, "entity/discounts");

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialDiscountstate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateDiscountsTitle') : i18n.t('addDiscountsTitle')), [isUpdateMode]);

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
                            <CFormInput value={Discounts.name} onChange={(e) => setFormdata({ ...Discounts, name: e.target.value })} type="text" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={Discounts.description} onChange={(e) => setFormdata({ ...Discounts, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationType">{i18n.t('typeInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={Discounts.type}
                                onChange={(e) => setFormdata({ ...Discounts, type: e.target.value })}
                                id="validationType"
                                required
                            >
                                <option value="percentage">{i18n.t('percentage')}</option>
                                <option value="flat">{i18n.t('flat')}</option>
                            </CFormSelect>
                            <CFormFeedback tooltip invalid>{i18n.t('requiredTypeField')}</CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationValue">{i18n.t('valueInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Discounts.value}
                                onChange={(e) => setFormdata({ ...Discounts, value: e.target.value })}
                                type="number"
                                id="validationValue"
                                required
                            />
                            <CFormFeedback tooltip invalid>{i18n.t('requiredValueField')}</CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="startDate">{i18n.t('startDateLabel')}</CFormLabel>
                            <CFormInput
                                type="date"
                                value={Discounts.start_date}
                                onChange={(e) => setFormdata({ ...Discounts, start_date: e.target.value })}
                                id="startDate"
                                required
                            />
                            <CFormFeedback tooltip invalid>{i18n.t('requiredStartDateField')}</CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="endDate">{i18n.t('endDateLabel')}</CFormLabel>
                            <CFormInput
                                type="date"
                                value={Discounts.end_date}
                                onChange={(e) => setFormdata({ ...Discounts, end_date: e.target.value })}
                                id="endDate"
                                required
                            />
                            <CFormFeedback tooltip invalid>{i18n.t('requiredEndDateField')}</CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="active">{i18n.t('activeLabel')}</CFormLabel>
                            <CFormSelect
                                value={Discounts.active}
                                onChange={(e) => setFormdata({ ...Discounts, active: e.target.value === 'true' })}
                                id="active"
                                required
                            >
                                <option value="true">{i18n.t('active')}</option>
                                <option value="false">{i18n.t('inactive')}</option>
                            </CFormSelect>
                        </CCol>

                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                {i18n.t('closeButton')}
                            </CButton>
                            <CButton color="primary" type="submit" >{i18n.t('saveButton')}</CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

DiscountsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedDiscounts: PropTypes.object,
};

export default DiscountsC;

