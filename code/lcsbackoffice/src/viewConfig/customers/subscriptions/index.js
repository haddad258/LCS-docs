
  import React, { useEffect, useState } from 'react';
  import {
      CRow,
      CCol,
      CCard,
      CCardHeader,
      CCardBody,
  } from '@coreui/react';
  import { settingsSubscriptions } from 'src/services/SupperSettings/index';
  import GenericTable from 'src/components/Generic.Table';
  import SubscriptionsC from './Subscription'
  import i18n from 'src/i18n';
  const Subscriptions = () => {
      const [List, setList] = useState([]);
  
      const fetchSubscriptions = async () => {
          try {
              const list = await settingsSubscriptions.getSubscription();
              if (list) {
                  setList(list?.data);
              }
          } catch (error) {
              console.error('Error fetching admin list:', error);
          }
      };
      useEffect(() => {
          fetchSubscriptions();
      }, []);
  
      const columns = [
          { label: '#', field: 'index' },
          { label: i18n.t('customerId'), field: 'customerId' },
          { label: i18n.t('profileId'), field: 'profileId' },
          { label: i18n.t('appreciationInputLabel'), field: 'note' },
          
          {
              label:  i18n.t('actionLabel'),
              field: 'actions',
              render: (item) => <SubscriptionsC refresh={()=>fetchSubscriptions()} selectedSubscriptions={item} />,
          },
      ];
  
      return (
          <CCard className="mb-4">
              <CCardHeader>
                  <CRow className="align-items-center">
                      <CCol md="6" xs="12">
                          <strong>   { i18n.t('SubscriptionsTableTitle')}</strong>
                      </CCol>
                      <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                          <SubscriptionsC refresh={()=>fetchSubscriptions()} />
                      </CCol>
                  </CRow>
              </CCardHeader>
              <CCardBody>
                  <CRow>
                      <CCol xs="12">
                          <CCard className="mb-4">
                              <CCardHeader>
                          <strong>{ i18n.t('SubscriptionsList')}</strong>
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
  
  export default Subscriptions;
  
  