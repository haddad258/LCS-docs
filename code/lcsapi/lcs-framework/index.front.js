const fs = require('fs');
const path = require('path');

function generateScript(modelName, routeName) {
    // Generate Controller Script
    const controllerScript = `
  import React, { useEffect, useState } from 'react';
  import {
      CRow,
      CCol,
      CCard,
      CCardHeader,
      CCardBody,
  } from '@coreui/react';
  import { settings${modelName}s } from 'src/services/SupperSettings/index';
  import GenericTable from 'src/components/Generic.Table';
  import ${modelName}sC from './${modelName}'
  import i18n from 'src/i18n';
  const ${modelName}s = () => {
      const [List, setList] = useState([]);
  
      const fetch${modelName}s = async () => {
          try {
              const list = await settings${modelName}s.get${modelName}s();
              if (list) {
                  setList(list?.data);
              }
          } catch (error) {
              console.error('Error fetching admin list:', error);
          }
      };
      useEffect(() => {
          fetch${modelName}s();
      }, []);
  
      const columns = [
          { label: '#', field: 'index' },
          { label: i18n.t('nameInputLabel'), field: 'name' },
          { label: i18n.t('descriptionInputLabel'), field: 'description' },
          { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },
          
          {
              label:  i18n.t('actionLabel'),
              field: 'actions',
              render: (item) => <${modelName}sC refresh={()=>fetch${modelName}s()} selected${modelName}s={item} />,
          },
      ];
  
      return (
          <CCard className="mb-4">
              <CCardHeader>
                  <CRow className="align-items-center">
                      <CCol md="6" xs="12">
                          <strong>   { i18n.t('${modelName}sTableTitle')}</strong>
                      </CCol>
                      <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                          <${modelName}sC refresh={()=>fetch${modelName}s()} />
                      </CCol>
                  </CRow>
              </CCardHeader>
              <CCardBody>
                  <CRow>
                      <CCol xs="12">
                          <CCard className="mb-4">
                              <CCardHeader>
                          <strong>{ i18n.t('${modelName}sList')}</strong>
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
  
  export default ${modelName}s;
  
  `;

    // Generate Route Script
    const routeScript = `
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
import { settings${modelName}s } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initial${modelName}state = {
    name: '',
    description: '',
    appreciation: ''

};


const ${modelName}sC = ({ refresh, selected${modelName}s }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [${modelName}, setFormdata] = useState(initial${modelName}state);

    useEffect(() => {
        setIsUpdateMode(!!selected${modelName}s);
        setFormdata(selected${modelName}s || initial${modelName}state);
    }, [selected${modelName}s]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settings${modelName}s.update${modelName}s(${modelName}, ${modelName}.id)
            : await settings${modelName}s.add${modelName}s(${modelName});

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initial${modelName}state);
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

    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('update${modelName}Title') : i18n.t('add${modelName}Title')), [isUpdateMode]);

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
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('nameInputLabel')}</CFormLabel>
                            <CFormInput value={${modelName}.name} onChange={(e) => setFormdata({ ...${modelName}, name: e.target.value })} type="text" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={${modelName}.description} onChange={(e) => setFormdata({ ...${modelName}, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('appreciationInputLabel')}</CFormLabel>
                            <CFormInput value={${modelName}.appreciation} onChange={(e) => setFormdata({ ...${modelName}, appreciation: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredAppreciationField')}
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

${modelName}sC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selected${modelName}s: PropTypes.object,
};

export default ${modelName}sC;

`;

    // Write Controller and Route Scripts to Files
    const controllerFileName = path.join(__dirname, `index.js`);
    fs.writeFileSync(controllerFileName, controllerScript);
    console.log(`Generated ${"index"}.js at ${controllerFileName}`);

    const routeFileName = path.join(__dirname, `${modelName}.js`);
    fs.writeFileSync(routeFileName, routeScript);
    console.log(`Generated ${routeName}.js at ${routeFileName}`);
}

const [modelName] = process.argv.slice(2);
console.log(modelName)

if (!modelName ) {
    console.error('Usage: node index.js <modelName> <routeName>');
} else {
    generateScript(modelName, modelName);
}
