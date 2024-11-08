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
    CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
  import { settingsArticlesProviders, settingsProviders, settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialArticlesProviderState = {
    articleId: '',
    providersId: ''
};

const ArticlesProvidersC = ({ refresh, selectedArticlesProviders }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [articlesProvider, setFormData] = useState(initialArticlesProviderState);
    const [listProviders, setListProviders] = useState([]);
    const [listArticles, setListArticles] = useState([]);

    useEffect(() => {
        setIsUpdateMode(!!selectedArticlesProviders);
        setFormData(selectedArticlesProviders || initialArticlesProviderState);
    }, [selectedArticlesProviders]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsArticlesProviders.updateArticlesProvider(articlesProvider, articlesProvider.id)
            : await settingsArticlesProviders.addArticlesProvider(articlesProvider);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormData(initialArticlesProviderState);
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

    const modalTitle = useMemo(
        () => (isUpdateMode ? i18n.t('updateArticlesProviderTitle') : i18n.t('addArticlesProviderTitle')),
        [isUpdateMode]
    );

    const fetchProviders = async () => {
        try {
            const list = await settingsProviders.getProviders();
            if (list) {
                setListProviders(list?.data);
            }
        } catch (error) {
            console.error('Error fetching providers:', error);
        }
    };

    const fetchArticles = async () => {
        try {
            const list = await settingsConfigArticles.getArticles();
            if (list) {
                setListArticles(list?.data);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const fetchAllData = async () => {
        try {
            await Promise.all([fetchProviders(), fetchArticles()]);
            setVisible(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={fetchAllData}>
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
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="articleSelect">{i18n.t('articleInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={articlesProvider.articleId}
                                onChange={(e) => setFormData({ ...articlesProvider, articleId: e.target.value })}
                                id="articleSelect"
                                required
                            >
                                <option value="">{i18n.t('selectArticlePlaceholder')}</option>
                                {listArticles?.map((article) => (
                                    <option key={article.id} value={article.id}>
                                        {article.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <CFormFeedback invalid>
                                {i18n.t('requiredArticleField')}
                            </CFormFeedback>
                        </CCol>

                        <CCol md={6} className="position-relative">
                            <CFormLabel htmlFor="providerSelect">{i18n.t('providerInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={articlesProvider.providersId}
                                onChange={(e) => setFormData({ ...articlesProvider, providersId: e.target.value })}
                                id="providerSelect"
                                required
                            >
                                <option value="">{i18n.t('selectProviderPlaceholder')}</option>
                                {listProviders?.map((provider) => (
                                    <option key={provider.id} value={provider.id}>
                                        {provider.username}
                                    </option>
                                ))}
                            </CFormSelect>
                            <CFormFeedback invalid>
                                {i18n.t('requiredProviderField')}
                            </CFormFeedback>
                        </CCol>

                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                                {i18n.t('closeButton')}
                            </CButton>
                            <CButton color="primary" type="submit">
                                {i18n.t('saveButton')}
                            </CButton>
                        </CModalFooter>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    );
};

ArticlesProvidersC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedArticlesProviders: PropTypes.object,
};

export default ArticlesProvidersC;
