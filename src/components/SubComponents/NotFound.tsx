import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HelmetTags, LangLink } from "../MainComponents";
import { useEffect } from "react";

export function Component() {
  const { t, i18n } = useTranslation("Pages_NotFound");

  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${lang}`);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="flex  items-center justify-center min-h-[calc(100vh-96px)] bg- w-full mb-20 md:py-20 text-temp_secondary">
      <HelmetTags
        title={t("tab.title")}
        description={t("tab.description")}
        index={false}
      />

      <div className="flex-center gap-10 site_container md:flex-col md:items-center">
        <div className="w-1/2  md:w-full flex justify-center">
          <img src="../assets/404.png" alt="404" />
        </div>

        <div className="w-1/2  md:w-full flex flex-col md:items-center">
          <h1 className="font-bold text-7xl">{t("heading")}</h1>
          <h2 className="font-medium text-2xl my-3">{t("sub_heading")}</h2>
          <h3 className="opacity-70">{t("txt")}</h3>
          <LangLink className="!w-fit mx mt-5" to="" id="custom__btn">
            <span>{t("CTA_txt")}</span>
          </LangLink>
        </div>
      </div>
    </section>
  );
}
