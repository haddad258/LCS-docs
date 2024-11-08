import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsPrivileges } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import PrivilegesC from './Privilege';
import i18n from 'src/i18n';
// const ForTest = React.lazy(() => import('../../components/Commun/Test'))
const Privileges = () => {
    const [List, setList] = useState([]);

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
    useEffect(() => {
        fetchPrivileges();
    }, []);

    const columns = [
        // { label: '#', field: 'index' },
        { label: i18n.t('privilegeInputLabel'), field: 'privilege', index: 'privilege' },
        { label: i18n.t('descriptionInputLabel'), field: 'description', index: 'description'},
        {
            label: i18n.t('actionLabel'),
            field: 'actions',
            render: (item) => <PrivilegesC refresh={()=>fetchPrivileges()} selectedPrivilege={item} />,
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>{i18n.t('privilegesList')} </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <PrivilegesC refresh={()=>fetchPrivileges()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('privilegesList')}</strong>
                            </CCardHeader>
                            <CCardBody>
                                    <GenericTable data={List} columns={columns}/>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default Privileges;
