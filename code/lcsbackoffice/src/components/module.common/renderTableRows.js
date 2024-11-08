import React from 'react';
import { CTableRow, CCol } from '@coreui/react';
import i18n from 'src/i18n';

export const renderTableRows = (label, value) => (
  <>
    <CTableRow>
      <CCol md={12} className="position-relative">
        <strong>{i18n.t(label)}</strong>
      </CCol>
    </CTableRow>
    <CTableRow>
      <CCol md={12} className="position-relative">
        {value}
      </CCol>
    </CTableRow>
  </>
);
