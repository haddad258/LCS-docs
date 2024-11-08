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
import { settingsArticlesDiscounts, settingsConfigApps, settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialArticlesDiscountState = {
    articleId: '',
    discountsId: ''
};

const ArticlesDiscountsC = ({ refresh, selectedArticlesDiscounts }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [articlesDiscount, setFormData] = useState(initialArticlesDiscountState);
    const [listDiscounts, setListDiscounts] = useState([]);
    const [listArticles, setListArticles] = useState([]);

    useEffect(() => {
        setIsUpdateMode(!!selectedArticlesDiscounts);
        setFormData(selectedArticlesDiscounts || initialArticlesDiscountState);
    }, [selectedArticlesDiscounts]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsArticlesDiscounts.updateArticlesDiscount(articlesDiscount, articlesDiscount.id)
            : await settingsArticlesDiscounts.addArticlesDiscount(articlesDiscount);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormData(initialArticlesDiscountState);
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
        () => (isUpdateMode ? i18n.t('updateArticlesDiscountTitle') : i18n.t('addArticlesDiscountTitle')),
        [isUpdateMode]
    );

    const fetchDiscounts = async () => {
        try {
            const list = await settingsConfigApps.getConfigApps("entity/discounts");
            if (list) {
                setListDiscounts(list?.data);
            }
        } catch (error) {
            console.error('Error fetching discounts:', error);
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
            await Promise.all([fetchDiscounts(), fetchArticles()]);
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
                                value={articlesDiscount.articleId}
                                onChange={(e) => setFormData({ ...articlesDiscount, articleId: e.target.value })}
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
                            <CFormLabel htmlFor="discountSelect">{i18n.t('discountInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={articlesDiscount.discountsId}
                                onChange={(e) => setFormData({ ...articlesDiscount, discountsId: e.target.value })}
                                id="discountSelect"
                                required
                            >
                                <option value="">{i18n.t('selectDiscountPlaceholder')}</option>
                                {listDiscounts?.map((discount) => (
                                    <option key={discount.id} value={discount.id}>
                                        {discount.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <CFormFeedback invalid>
                                {i18n.t('requiredDiscountField')}
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

ArticlesDiscountsC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedArticlesDiscounts: PropTypes.object,
};

export default ArticlesDiscountsC;
