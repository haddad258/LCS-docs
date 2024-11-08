
import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsProviders } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import ProvidersC from './Providers'
import ProvidersCridentials from './Cridentials'
import i18n from 'src/i18n';
const Providers = () => {
    const [List, setList] = useState([]);

    const fetchProviders = async () => {
        try {
            const list = await settingsProviders.getProviders();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchProviders();
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
                    <ProvidersCridentials refresh={() => fetchProviders()} selectedProviders={item} />
                    <ProvidersC refresh={() => fetchProviders()} selectedProviders={item} />
                </>
            ),
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>   {i18n.t('ProvidersTableTitle')}</strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <ProvidersC refresh={() => fetchProviders()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('ProvidersList')}</strong>
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

export default Providers;

