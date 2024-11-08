
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
    CFormSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { settingsArticlesNotes, settingsConfigArticles } from 'src/services/SupperSettings';
import PropTypes from 'prop-types';
import i18n from 'src/i18n';

const initialArticlesNotestate = {
    articleId: '',


};


const ArticlesNotesC = ({ refresh, selectedArticlesNotes }) => {
    const [visible, setVisible] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [listArticles, setListArticles] = useState([]);

    const [ArticlesNote, setFormdata] = useState(initialArticlesNotestate);

    useEffect(() => {
        setIsUpdateMode(!!selectedArticlesNotes);
        setFormdata(selectedArticlesNotes || initialArticlesNotestate);
    }, [selectedArticlesNotes]);

    const handleAddOrUpdate = async () => {
        const result = isUpdateMode
            ? await settingsArticlesNotes.updateArticlesNote(ArticlesNote, ArticlesNote.id)
            : await settingsArticlesNotes.addArticlesNote(ArticlesNote);

        if (result) {
            setVisible(false);
            setValidated(false);
            setIsUpdateMode(false);
            setFormdata(initialArticlesNotestate);
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
            await Promise.all([fetchArticles()]);
            setVisible(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const modalTitle = useMemo(() => (isUpdateMode ? i18n.t('updateArticlesNoteTitle') : i18n.t('addArticlesNoteTitle')), [isUpdateMode]);

    return (
        <>
            <CButton color={isUpdateMode ? 'secondary' : 'primary'} onClick={() => fetchAllData()}>
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
                            <CFormLabel htmlFor="articleSelect">{i18n.t('articleInputLabel')}</CFormLabel>
                            <CFormSelect
                                value={ArticlesNote.articleId}
                                onChange={(e) => setFormdata({ ...ArticlesNote, articleId: e.target.value })}
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
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip01">{i18n.t('nameInputLabel')}</CFormLabel>
                            <CFormInput value={ArticlesNote.name} onChange={(e) => setFormdata({ ...ArticlesNote, name: e.target.value })} type="text" id="validationTooltip01" defaultValue="" required />
                            <CFormFeedback tooltip invalid>
                                {i18n.t('requiredNameField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('descriptionInputLabel')}</CFormLabel>
                            <CFormInput value={ArticlesNote.description} onChange={(e) => setFormdata({ ...ArticlesNote, description: e.target.value })} type="title" id="validationTooltip03" required />
                            <CFormFeedback tooltip invalid>
                            {i18n.t('requiredDescriptionField')}
                            </CFormFeedback>
                        </CCol>
                        <CCol md={12} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip03">{i18n.t('note')}</CFormLabel>
                            <CFormInput value={ArticlesNote.note} onChange={(e) => setFormdata({ ...ArticlesNote, note: e.target.value })} type="number" id="validationTooltip03" required />
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

ArticlesNotesC.propTypes = {
    refresh: PropTypes.func.isRequired,
    selectedArticlesNotes: PropTypes.object,
};

export default ArticlesNotesC;

