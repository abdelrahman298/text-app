import { useFetchData } from "@/Hooks/useAxios";
import { HelmetTags } from "@/components/MainComponents";
import { ErrorMessage, Loader } from "@/components/SubComponents";
import { useTranslation } from "react-i18next";

export function Component() {
  const { t, i18n } = useTranslation("Pages_About");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_HomePage",
    `${import.meta.env.VITE_GET_SEO_DATA}/HomePage`
  );
  const { data, isPending, isError, isPaused } = useFetchData(
    "About",
    import.meta.env.VITE_ABOUT
  );
  return (
    <section className="pt-20 pb-44 site_container flex flex-col items-center text-temp_secondary">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/about-us`}
      />

      <div className="  w-full flex justify-between  flex-col items-center ">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          <Loader className="  h-[370px] mb-32" />
        ) : (
          <>
            <div
              className="w-fit max-w-fit flex-center  bg-delet text-justify"
              dangerouslySetInnerHTML={{ __html: data?.about_details }}
            ></div>
            <div className="w-5/6  md:w-full mt-10 border-2 border-temp_secondary p-3 round">
              <img
                className="w-full  h-full object-cover round"
                src={data?.about_image}
                alt="service-process"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
