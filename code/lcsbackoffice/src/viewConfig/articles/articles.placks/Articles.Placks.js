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
  import { settingsArticlesPlacks, settingsPlacks, settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialArticlesPlackState = {
    articleId: '',
    placksId: ''
};

const ArticlesPlacksC = ({ refresh, selectedArticlesPlacks }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [articlesPlack, setFormData] = useState(initialArticlesPlackState);
    const [listPlacks, setListPlacks] = useState([]);
    const [listArticles, setListArticles] = useState([]);

    useEffect(() => {
        setIsUpdateMode(!!selectedArticlesPlacks);
        setFormData(selectedArticlesPlacks || initialArticlesPlackState);
    }, [selectedArticlesPlacks]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsArticlesPlacks.updateArticlesPlack(articlesPlack, articlesPlack.id)
            : await settingsArticlesPlacks.addArticlesPlack(articlesPlack);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormData(initialArticlesPlackState);
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
        () => (isUpdateMode ? i18n.t('updateArticlesPlackTitle') : i18n.t('addArticlesPlackTitle')),
        [isUpdateMode]
    );

    const fetchPlacks = async () => {
        try {
            const list = await settingsPlacks.getPlacks();
            if (list) {
                setListPlacks(list?.data);
            }
        } catch (error) {
            console.error('Error fetching placks:', error);
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
            await Promise.all([fetchPlacks(), fetchArticles()]);
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
                                value={articlesPlack.articleId}
                                onChange={(e) => setFormData({ ...articlesPlack, articleId: e.target.value })}
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
                            <CFormLabel htmlFor="plackSelect">{i18n.t('plackInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={articlesPlack.placksId}
                                onChange={(e) => setFormData({ ...articlesPlack, placksId: e.target.value })}
                                id="plackSelect"
                                required
                            >
                                <option value="">{i18n.t('selectPlackPlaceholder')}</option>
                                {listPlacks?.map((plack) => (
                                    <option key={plack.id} value={plack.id}>
                                        {plack.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <CFormFeedback invalid>
                                {i18n.t('requiredPlackField')}
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

ArticlesPlacksC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedArticlesPlacks: PropTypes.object,
};

export default ArticlesPlacksC;
