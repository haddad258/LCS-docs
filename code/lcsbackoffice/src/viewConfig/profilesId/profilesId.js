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
import { settingsProfilesIds } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialProfilesIdstate = {
    lpa_esim: '',
    iccid: '',
    imsi: '',
    mnc: '',
    mcc: '',
    number: '',
    brand: '',
    ki: '',
    norm_ref: '',
    type: 'default',
    countryCode: 'default',
    operator: 'default',
    description: 'default',
    status: 0,
    activeDate: '',
};

const ProfilesIdsC = ({ refresh, selectedProfilesIds }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [ProfilesIds, setFormdata] = useState(initialProfilesIdstate);

    useEffect(() => {
        setIsUpdateMode(!!selectedProfilesIds);
        setFormdata(selectedProfilesIds || initialProfilesIdstate);
    }, [selectedProfilesIds]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsProfilesIds.updateProfilesIds(ProfilesIds, ProfilesIds.id)
            : await settingsProfilesIds.addProfilesIds(ProfilesIds);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialProfilesIdstate);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateProfilesIdsTitle') : i18n.t('addProfilesIdsTitle')), [isUpdateMode]);

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
                        {Object.keys(initialProfilesIdstate).map((key, index) => (
                            <CCol md={6} className="position-relative" key={index}>
                                <CFormLabel htmlFor={key}>{i18n.t(`${key}Label`)}</CFormLabel>
                                <CFormInput
                                    value={ProfilesIds[key]}
                                    onChange={(e) => setFormdata({ ...ProfilesIds, [key]: e.target.value })}
                                    type={key === 'activeDate' ? 'date' : 'text'}
                                    id={key}
                                    required={key !== 'description' && key !== 'status'}
                                />
                                <CFormFeedback tooltip invalid>
                                    {i18n.t(`required${key}Field`)}
                                </CFormFeedback>
                            </CCol>
                        ))}

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

ProfilesIdsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedProfilesIds: PropTypes.object,
};

export default ProfilesIdsC;
