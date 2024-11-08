import React from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
} from '@coreui/react';
import i18n from 'src/i18n';
const Reporting = () => {
    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>{i18n.t('reportingMenuTitle')} </strong>
                    </CCol>
                </CRow>
            </CCardHeader>
        </CCard>
    );
};

export default Reporting;
