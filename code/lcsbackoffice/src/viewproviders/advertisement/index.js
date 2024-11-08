
  import React, { useEffect, useState } from 'react';
  import {
      CRow,
      CCol,
      CCard,
      CCardHeader,
      CCardBody,
  } from '@coreui/react';
  import { settingsProviderAdvertisements } from 'src/services/SupperSettings/index';
  import GenericTable from 'src/components/Generic.Table';
  import ProviderAdvertisementsC from './ProviderAdvertisement'
  import i18n from 'src/i18n';
  const ProviderAdvertisements = () => {
      const [List, setList] = useState([]);
  
      const fetchProviderAdvertisements = async () => {
          try {
              const list = await settingsProviderAdvertisements.getProviderAdvertisements();
              if (list) {
                  setList(list?.data);
              }
          } catch (error) {
              console.error('Error fetching admin list:', error);
          }
      };
      useEffect(() => {
          fetchProviderAdvertisements();
      }, []);
  
      const columns = [
          { label: '#', field: 'index' },
          { label: i18n.t('nameInputLabel'), field: 'name' },
          { label: i18n.t('descriptionInputLabel'), field: 'description' },
          { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },
          
          {
              label:  i18n.t('actionLabel'),
              field: 'actions',
              render: (item) => <ProviderAdvertisementsC refresh={()=>fetchProviderAdvertisements()} selectedProviderAdvertisements={item} />,
          },
      ];
  
      return (
          <CCard className="mb-4">
              <CCardHeader>
                  <CRow className="align-items-center">
                      <CCol md="6" xs="12">
                          <strong>   { i18n.t('ProviderAdvertisementsTableTitle')}</strong>
                      </CCol>
                      <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                          <ProviderAdvertisementsC refresh={()=>fetchProviderAdvertisements()} />
                      </CCol>
                  </CRow>
              </CCardHeader>
              <CCardBody>
                  <CRow>
                      <CCol xs="12">
                          <CCard className="mb-4">
                              <CCardHeader>
                          <strong>{ i18n.t('ProviderAdvertisementsList')}</strong>
                              </CCardHeader>
                              <CCardBody>
                                      <GenericTable columns={columns} data={List} />
                              </CCardBody>
                          </CCard>
                      </CCol>
                  </CRow>
              </CCardBody>
          </CCard>
      );
  };
  
  export default ProviderAdvertisements;
  
  