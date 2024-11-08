import React, { useState, useMemo } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types';
import { cilCheckCircle, cilXCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { commonSettings } from 'src/services/common.settings';
import i18n from 'src/i18n';

const StatusRow = ({ status, entityName, data, id, refresh }) => {
  const [visible, setVisible] = useState(false)
  const formattedData = useMemo(() => {
    return (status ? i18n.t('inactivateElementStatus') : i18n.t('activateElementStatus'));
  }, [status])

  const handleSubmit = async () => {
    var newstatus = status ? 0 : 1;
    const result = await commonSettings.updateTableStatus({
      status: newstatus,
      data: data,
      id: id
    })

    if (result) {
      setVisible(false);
      refresh();
    }
  };

  return (
    <>
      <CButton color={status?"success":"danger"} onClick={() => setVisible(!visible)}>
          <CIcon icon={status ? cilCheckCircle : cilXCircle} />
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{i18n.t('updateElementStatusTitle')} : {i18n.t(entityName)}</CModalTitle>
        </CModalHeader>
        <CModalBody>

          <p>{formattedData} </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            {i18n.t('closeButton')}
          </CButton>
          <CButton onClick={() => handleSubmit()} color="primary">{i18n.t('saveButton')}</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
StatusRow.propTypes = {
  refresh: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  id: PropTypes.object,
  status: PropTypes.object,
  entityName: PropTypes.object
};
export default StatusRow
