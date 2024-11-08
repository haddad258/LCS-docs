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
import { settingsUserAdmins, settingsPrivileges } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialUserAdminState = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    privilege:'',

};


const UserAdminsC = ({ refresh, selectedUserAdmin }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [List, setList] = useState([]);

    const [UserAdmin, setUserAdmin] = useState(initialUserAdminState);

    useEffect(() => {
        setIsUpdateMode(!!selectedUserAdmin);
        setUserAdmin(selectedUserAdmin || initialUserAdminState);
    }, [selectedUserAdmin]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsUserAdmins.updateUsersAdmin(UserAdmin, UserAdmin.id)
            : await settingsUserAdmins.addUsersAdmin(UserAdmin);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
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
    const createNewAdmin = async () => {
        fetchPrivileges();
        setVisible(!visible)

    };
    const fetchPrivileges = async () => {
        try {
            const list = await settingsPrivileges.getPrivilege();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateUserTitle') : i18n.t('addUserTitle')), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={() => createNewAdmin()}>
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
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('firstNameInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.name} onChange={(e) => setUserAdmin({ ...UserAdmin, name: e.target.value })} type="text" id="validationTooltip01" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredFirstNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('lastNameInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.lastname} onChange={(e) => setUserAdmin({ ...UserAdmin, lastname: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredLastNameField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('usernameInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.username} onChange={(e) => setUserAdmin({ ...UserAdmin, username: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredUsernameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('emailInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.email} onChange={(e) => setUserAdmin({ ...UserAdmin, email: e.target.value })} type="email" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredEmailField')}
                            </CFormFeedback>
                        </CCol>

                       
                       
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={UserAdmin.description} onChange={(e) => setUserAdmin({ ...UserAdmin, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">{i18n.t('privilegeTypeInputLabel')}</CFormLabel>
                            <CFormSelect
                                defaultValue={UserAdmin.privilege || ""}
                                onChange={(e) => setUserAdmin({ ...UserAdmin, privilege: e.target.value })}
                                id="validationTooltip04"
                                required
                            >
                                <option value={UserAdmin.privilege || ""}>{UserAdmin.privilege}</option>
                                {List?.map((privilege, index) => (
                                    <option key={`type${index}`} value={privilege.privilege}>
                                        {privilege.privilege} : {privilege.description}
                                    </option>
                                ))}
                            </CFormSelect>

                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredPrivilegeField')}
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

UserAdminsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedUserAdmin: PropTypes.object,
};

export default UserAdminsC;
