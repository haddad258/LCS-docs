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
import { settingsUserAdmins } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialUserAdminState = {
    password: '',

};


const PasswordAdmin = ({ refresh, selectedUserAdmin }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);

    const [UserAdmin, setUserAdmin] = useState(initialUserAdminState);

    useEffect(() => {
        setUserAdmin(initialUserAdminState);
    }, [selectedUserAdmin]);

    const handleAddOrUpdate = async () => {
        const result = await settingsUserAdmins.updateUsersAdminPassword({ password: UserAdmin.password }, selectedUserAdmin.id)

        if (result) {
            setVisible(false);
            setValidated(false);
            setUserAdmin(initialUserAdminState);
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
            <CButton color={'warning'} onClick={() => setVisible(!visible)}>
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
                    <CModalTitle id="LiveDemoExampleLabel"> {i18n.t('updatePasswordTitle')}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('passwordInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.password} onChange={(e) => setUserAdmin({ ...UserAdmin, password: e.target.value })} type="password" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredPasswordField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('confirmPasswordInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.password} onChange={(e) => setUserAdmin({ ...UserAdmin, password: e.target.value })} type="password" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredConfirmPasswordField')}
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

PasswordAdmin.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedUserAdmin: PropTypes.object,
};

export default PasswordAdmin;
