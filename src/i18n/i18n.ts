// export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { store } from "../store";

// Get initial state
const { dir, lang } = store.getState().locale;
const initialLanguage = lang || navigator.language.split("-")[0] || "en";

// Function to update i18n when locale changes
function updateI18n(dir: string, lang: string) {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
}

// Subscribe to store changes
store.subscribe(() => {
  const { dir, lang } = store.getState().locale;
  updateI18n(dir, lang);
});

// Initialize i18next
i18n
  .use(Backend) // Load translation files
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: "en",
    defaultNS: "general",
    ns: [],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });
// Set HTML direction based on language
document.documentElement.lang = initialLanguage;
document.documentElement.dir = dir;

export default i18n;
