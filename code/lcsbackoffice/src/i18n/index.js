import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en_En.json';
import translationAr from './locales/ar_SA.json';
import translationFR from './locales/fr_FR.json';

const locales = ['en', 'fr','ar'];
let defaultLanguage = "fr";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  ar: {
    translation:   translationAr

  },
  
};

i18n.use(LanguageDetector)
//.use(initReactI18next)  // passes i18n down to react-i18next
.init({
    resources,
    lng: defaultLanguage,
    locales,
    keySeparator:false,  // to support nested translations

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;