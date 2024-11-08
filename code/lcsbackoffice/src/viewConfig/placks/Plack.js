
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
import { settingsPlacks } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialPlackstate = {
    name: '',
    description: '',
    quantity: '',
    unit_price: '',
    location: '',
    provider: ''
};

const PlacksC = ({ refresh, selectedPlacks }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [Placks, setFormdata] = useState(initialPlackstate);

    useEffect(() => {
        setIsUpdateMode(!!selectedPlacks);
        setFormdata(selectedPlacks || initialPlackstate);
    }, [selectedPlacks]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPlacks.updatePlacks(Placks, Placks.id)
            : await settingsPlacks.addPlacks(Placks);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialPlackstate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updatePlacksTitle') : i18n.t('addPlacksTitle')), [isUpdateMode]);

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
                            <CFormInput value={Placks.name} onChange={(e) => setFormdata({ ...Placks, name: e.target.value })} type="text" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={Placks.description} onChange={(e) => setFormdata({ ...Placks, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="quantity">{i18n.t('quantityLabel')}</CFormLabel>
                            <CFormInput
                                value={Placks.quantity}
                                onChange={(e) => setFormdata({ ...Placks, quantity: e.target.value })}
                                type="number"
                                id="quantity"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredQuantityField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="unitPrice">{i18n.t('unitPriceLabel')}</CFormLabel>
                            <CFormInput
                                value={Placks.unit_price}
                                onChange={(e) => setFormdata({ ...Placks, unit_price: e.target.value })}
                                type="number"
                                step="0.01"
                                id="unitPrice"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredPriceField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="location">{i18n.t('locationLabel')}</CFormLabel>
                            <CFormInput
                                value={Placks.location}
                                onChange={(e) => setFormdata({ ...Placks, location: e.target.value })}
                                type="text"
                                id="location"
                            />
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="provider">{i18n.t('providerLabel')}</CFormLabel>
                            <CFormInput
                                value={Placks.provider}
                                onChange={(e) => setFormdata({ ...Placks, provider: e.target.value })}
                                type="text"
                                id="provider"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredProviderField')}
                            </CFormFeedback>
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

PlacksC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPlacks: PropTypes.object,
};

export default PlacksC;

