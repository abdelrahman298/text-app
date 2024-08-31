import { useFetchData } from "@/Hooks/useAxios";
import {
  Heading,
  HeadingUnderline,
  HelmetTags,
  SubHeading,
} from "@/components/MainComponents";
import { ErrorMessage, Loader } from "@/components/SubComponents";
import { useTranslation } from "react-i18next";

export function Component() {
  const { t, i18n } = useTranslation("Pages_TermsConditions");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_TermsConditions",
    `${import.meta.env.VITE_GET_SEO_DATA}/TermsConditions`
  );
  const { data, isPending, isError, isPaused } = useFetchData(
    "TermsConditions",
    import.meta.env.VITE_TERMS_PRIVACY
  );
  return (
    <section className="py-20  site_container text-temp_secondary ">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/terms-conditions`}
      />

      <Heading className={"text-center"}>{t("heading")}</Heading>
      <SubHeading>{t("sub_heading")}</SubHeading>

      <div className="flex justify-between items-start md:flex-col md:items-center gap-28 md:gap-20 mt-10 ">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          <Loader className="h-[330px] " />
        ) : (
          <>
            <div className="terms__left  w-1/2 md:w-full ">
              <HeadingUnderline className="text-2xl mb-5 md:text-center">
                {t("terms.title")}
              </HeadingUnderline>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: data?.terms }}
              ></p>
            </div>
            <div className="terms__right  w-1/2 md:w-full">
              <HeadingUnderline className="text-2xl mb-5 md:text-center">
                {t("Privacy.title")}
              </HeadingUnderline>
              <p
                dangerouslySetInnerHTML={{ __html: data?.privacy }}
                className="text-justify"
              ></p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
