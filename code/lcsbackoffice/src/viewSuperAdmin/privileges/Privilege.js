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
import { settingsPrivileges } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';
const initialPrivilegeState = {
    privilege: '',
    description:'',

};


const PrivilegesC = ({ refresh, selectedPrivilege }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [Privilege, setPrivilege] = useState(initialPrivilegeState);

    useEffect(() => {
        setIsUpdateMode(!!selectedPrivilege);
        setPrivilege(selectedPrivilege || initialPrivilegeState);
    }, [selectedPrivilege]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsPrivileges.updatePrivilege(Privilege, Privilege.privilege)
            : await settingsPrivileges.addPrivilege(Privilege);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setPrivilege(initialPrivilegeState);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updatePrivilegeTitle') : i18n.t('addPrivilegeTitle')), [isUpdateMode]);

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
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('privilegeInputLabel')}</CFormLabel>
                            <CFormInput value={Privilege.privilege} disabled={isUpdateMode} onChange={(e) => setPrivilege({ ...Privilege, privilege: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredPrivilegeField')}
                            </CFormFeedback>
                        </CCol>
                      
               
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={Privilege.description} onChange={(e) => setPrivilege({ ...Privilege, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredDescriptionField')}
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

PrivilegesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedPrivilege: PropTypes.object,
};

export default PrivilegesC;
