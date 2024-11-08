
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
import { settingsProviders } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialProviderstate = {
    firstname: '',
    lastname: '',
    username: '',
    cin: '',
    description: '',
    email: '',
    password: '',
    phone_number: '',
    address: ''
};
const ProvidersC = ({ refresh, selectedProviders }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [Providers, setFormdata] = useState(initialProviderstate);

    useEffect(() => {
        setIsUpdateMode(!!selectedProviders);
        setFormdata(selectedProviders || initialProviderstate);
    }, [selectedProviders]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsProviders.updateProviders(Providers, Providers.id)
            : await settingsProviders.addProviders(Providers);
    
        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialProviderstate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateProvidersTitle') : i18n.t('addProvidersTitle')), [isUpdateMode]);

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


                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="firstname">{i18n.t('firstnameInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.firstname}
                                onChange={(e) => setFormdata({ ...Providers, firstname: e.target.value })}
                                type="text"
                                id="firstname"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredFirstnameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="lastname">{i18n.t('lastnameInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.lastname}
                                onChange={(e) => setFormdata({ ...Providers, lastname: e.target.value })}
                                type="text"
                                id="lastname"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredLastnameField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="username">{i18n.t('usernameInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.username}
                                onChange={(e) => setFormdata({ ...Providers, username: e.target.value })}
                                type="text"
                                id="username"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredUsernameField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="cin">{i18n.t('cinInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.cin}
                                onChange={(e) => setFormdata({ ...Providers, cin: e.target.value })}
                                type="text"
                                id="cin"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredCinField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="email">{i18n.t('emailInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.email}
                                onChange={(e) => setFormdata({ ...Providers, email: e.target.value })}
                                type="email"
                                id="email"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredEmailField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="password">{i18n.t('passwordInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.password}
                                onChange={(e) => setFormdata({ ...Providers, password: e.target.value })}
                                type="password"
                                id="password"
                                required
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredPasswordField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="phone_number">{i18n.t('phoneInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.phone_number}
                                onChange={(e) => setFormdata({ ...Providers, phone_number: e.target.value })}
                                type="text"
                                id="phone_number"
                            />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredPhoneField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="address">{i18n.t('addressInputLabel')}</CFormLabel>
                            <CFormInput
                                value={Providers.address}
                                onChange={(e) => setFormdata({ ...Providers, address: e.target.value })}
                                type="text"
                                id="address"
                            />
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

ProvidersC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedProviders: PropTypes.object,
};

export default ProvidersC;

