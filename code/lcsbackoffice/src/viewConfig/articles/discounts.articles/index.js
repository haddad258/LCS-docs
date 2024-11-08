
  import React, { useEffect, useState } from 'react';
  import {
      CRow,
      CCol,
      CCard,
      CCardHeader,
      CCardBody,
  } from '@coreui/react';
  import { settingsArticlesDiscounts } from 'src/services/SupperSettings/index';
  import GenericTable from 'src/components/Generic.Table';
  import ArticlesDiscountsC from './ArticlesDiscount'
  import i18n from 'src/i18n';
  const ArticlesDiscounts = () => {
      const [List, setList] = useState([]);
  
      const fetchArticlesDiscounts = async () => {
          try {
              const list = await settingsArticlesDiscounts.getArticlesDiscount();
              if (list) {
                  setList(list?.data);
              }
          } catch (error) {
              console.error('Error fetching admin list:', error);
          }
      };
      useEffect(() => {
          fetchArticlesDiscounts();
      }, []);
  
      const columns = [
          { label: '#', field: 'index' },
          { label: i18n.t('nameInputLabel'), field: 'name' },
          { label: i18n.t('descriptionInputLabel'), field: 'description' },
          { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },
          
          {
              label:  i18n.t('actionLabel'),
              field: 'actions',
              render: (item) => <ArticlesDiscountsC refresh={()=>fetchArticlesDiscounts()} selectedArticlesDiscounts={item} />,
          },
      ];
  
      return (
          <CCard className="mb-4">
              <CCardHeader>
                  <CRow className="align-items-center">
                      <CCol md="6" xs="12">
                          <strong>   { i18n.t('ArticlesDiscountsTableTitle')}</strong>
                      </CCol>
                      <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                          <ArticlesDiscountsC refresh={()=>fetchArticlesDiscounts()} />
                      </CCol>
                  </CRow>
              </CCardHeader>
              <CCardBody>
                  <CRow>
                      <CCol xs="12">
                          <CCard className="mb-4">
                              <CCardHeader>
                          <strong>{ i18n.t('ArticlesDiscountsList')}</strong>
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
  
  export default ArticlesDiscounts;
  
  