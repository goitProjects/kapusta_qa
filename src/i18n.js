import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: false,
//     detection: {
//       order: ['queryString', 'cookie'],
//       cache: ['cookie'],
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
