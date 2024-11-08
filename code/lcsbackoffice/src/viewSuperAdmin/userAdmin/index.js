import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsUserAdmins } from 'src/services/SupperSettings/index';
import UserAdminsC from './UserAdmin'
import PasswordAdmin from './Password'
import i18n from 'src/i18n';
// import ForTest from 'src/components/Commun/Test';
import GenericTable from 'src/components/Generic.Table';
const UserAdmins = () => {
    const [List, setList] = useState([]);

    const fetchUserAdmins = async () => {
        try {
            const list = await settingsUserAdmins.getUsersAdmin();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchUserAdmins();
    }, []);

    const columns = [
        // { label: '#', field: 'index' },
        { label: i18n.t('firstNameInputLabel'), field: 'name', index: 'name' },
        { label: i18n.t('lastNameInputLabel'), field: 'lastname', index: 'lastname' },
        { label: i18n.t('descriptionInputLabel'), field: 'description', index: 'description'},
        {
            label: i18n.t('actionLabel'),
            field: 'actions',
            render: (item) => 
            (
                <>
                
            <UserAdminsC refresh={()=>fetchUserAdmins()} selectedUserAdmin={item} />
            <PasswordAdmin refresh={()=>fetchUserAdmins()} selectedUserAdmin={item} />
                </>
            )
            ,
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>{i18n.t('usersList')} </strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <UserAdminsC refresh={()=>fetchUserAdmins()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('usersList')}</strong>
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

export default UserAdmins;
