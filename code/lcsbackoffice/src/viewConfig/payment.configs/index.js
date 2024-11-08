
import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsPaymentModes } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import PaymentModesC from './PaymentMode'
import i18n from 'src/i18n';
import ImagesDetailsC from 'src/components/Images/Images.Details';
import ImagesConfigsC from 'src/components/Images/add.image.Folder';
const PaymentModes = () => {
    const [List, setList] = useState([]);

    const fetchPaymentModes = async () => {
        try {
            const list = await settingsPaymentModes.getPaymentModes();
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchPaymentModes();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: i18n.t('nameInputLabel'), field: 'name' },
        { label: i18n.t('descriptionInputLabel'), field: 'description' },
        { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },

        {
            label: i18n.t('actionLabel'),
            field: 'actions',
            render: (item) => <PaymentModesC refresh={() => fetchPaymentModes()} selectedPaymentModes={item} />,
        },
        {
            label: i18n.t('Images'),
            field: 'actions',
            render: (item) =>
                <>
                    <ImagesDetailsC refresh={() => fetchPaymentModes()} selectedImagesConfigs={item} type={"paymentmode"} />
                    <ImagesConfigsC refresh={() => fetchPaymentModes()} selectedImagesConfigs={item} type={"paymentmode"} />
                </>
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>   {i18n.t('PaymentModesTableTitle')}</strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <PaymentModesC refresh={() => fetchPaymentModes()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('PaymentModesList')}</strong>
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

export default PaymentModes;

