
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
import { cilLockLocked } from '@coreui/icons';
import { settingsProviders } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialProviderstate = {
    password: '',
};
const ProvidersCridentials = ({ refresh, selectedProviders }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [Providers, setFormdata] = useState(initialProviderstate);
    useEffect(() => {
        setFormdata(initialProviderstate);
    }, [selectedProviders]);
    const handleAddOrUpdate = async () => {
        const result =  await settingsProviders.updateProvidersCridentials({password:Providers.password}, selectedProviders.id)
            

        if (result) {
            setVisible(false);
            setValidated(false);
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


    return (
        <>
            <CButton color={"warning"} onClick={() => setVisible(!visible)}>
                <CIcon icon={cilLockLocked} />
            </CButton>

            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
                size="xl"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{ i18n.t('updateProvidersPaswword') }</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >

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

ProvidersCridentials.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedProviders: PropTypes.object,
};

export default ProvidersCridentials;

