
import React, { useEffect, useState } from 'react';
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { settingsConfigArticles } from 'src/services/SupperSettings/index';
import GenericTable from 'src/components/Generic.Table';
import ArticlesC from './Articles'
import i18n from 'src/i18n';
import ImagesDetailsC from 'src/components/Images/Images.Details';
import ImagesConfigsC from 'src/components/Images/add.image.Folder';
import ImagesConfigsMutiplesC from 'src/components/Images/add.image.Folder.Multiples';
import ListImagesArticlesC from './ListImagesArticle';
const Articles = () => {
    const [List, setList] = useState([]);

    const fetchArticles = async () => {
        try {
            const list = await settingsConfigArticles.getArticles("entity/brands");
            if (list) {
                setList(list?.data);
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    };
    useEffect(() => {
        fetchArticles();
    }, []);

    const columns = [
        { label: '#', field: 'index' },
        { label: i18n.t('nameInputLabel'), field: 'name' },
        { label: i18n.t('descriptionInputLabel'), field: 'description' },
        { label: i18n.t('appreciationInputLabel'), field: 'appreciation' },

        {
            label: i18n.t('actionLabel'),
            field: 'actions',
            render: (item) =>
                <>
                    <ArticlesC refresh={() => fetchArticles()} selectedArticles={item} />
                    <ImagesConfigsC refresh={() => fetchArticles()} selectedImagesConfigs={item} type={"articles"} />
                    <ImagesConfigsMutiplesC refresh={() => fetchArticles()} selectedImagesConfigs={item} type={"imagesarticles"} />

                </>
        },
        {
            label: i18n.t('Images'),
            field: 'actions',
            render: (item) =>
                <>
                    <ImagesDetailsC refresh={() => fetchArticles()} selectedImagesConfigs={item} type={"articles"} />
                    <ListImagesArticlesC refresh={() => fetchArticles()} selectedListImagesArticles={item} />
                </>
        },
    ];

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <CRow className="align-items-center">
                    <CCol md="6" xs="12">
                        <strong>   {i18n.t('ArticlesTableTitle')}</strong>
                    </CCol>
                    <CCol md="6" xs="12" className="text-md-end mt-md-0 mt-3">
                        <ArticlesC refresh={() => fetchArticles()} />
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="12">
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>{i18n.t('ArticlesList')}</strong>
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

export default Articles;

