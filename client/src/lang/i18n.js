import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translation.en.json";
import krTranslation from "./translation.kr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ko: {
      translation: krTranslation,
    },
  },
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});



export default i18n;
