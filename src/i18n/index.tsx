import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });
i18n?.services?.formatter?.add("area", (value, lng) => {
  return lng === "ar" ? value + " " + "م²" : value + " " + "M²";
});
i18n?.services?.formatter?.add("duration", (value, lng) => {
  console.log(value);

  if (lng === "ar") {
    return value === "monthly"
      ? "شهر"
      : value === "daily"
      ? "يوم"
      : value === "3_months"
      ? "٣ أشهر"
      : value === "6_months"
      ? "٦ أشهر"
      : value === "9_months"
      ? "٩ أشهر"
      : value === "yearly"
      ? "سنويا"
      : "شهر";
  } else {
    return value === "monthly"
      ? "Month"
      : value === "daily"
      ? "Day"
      : value === "3_months"
      ? "3 Months"
      : value === "6_months"
      ? "6 Months"
      : value === "9_months"
      ? "9 Months"
      : value === "yearly"
      ? "Yearly"
      : "Month";
  }
});
export default i18n;
