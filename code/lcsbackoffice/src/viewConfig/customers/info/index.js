
import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsCustomers } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';

import i18n from 'src/i18n';
import ListImagesCustomersC from './ListImagesCustomers';
const Customers = () => {
    const [List, setList] = useState([]);

    const fetchCustomers = async () => {
        try {
            const list = await settingsCustomers.getCustomers();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: i18n.t('usename'), field: 'username' },
        { label: i18n.t('emailInputLabel'), field: 'email' },
        { label: i18n.t('cinInputLabel'), field: 'cin' },
        { label: i18n.t('phoneInputLabel'), field: 'phone_number' },

        {
            label: i18n.t('actionLabel'),
            field: 'actions',
            render: (item) => (
                <>
                    <ListImagesCustomersC refresh={() => fetchCustomers()} selectedListImagesCustomers={item} />
                </>
            ),
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>   {i18n.t('CustomersTableTitle')}</strong>
                    </CCol>
                    
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('CustomersList')}</strong>
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

export default Customers;

