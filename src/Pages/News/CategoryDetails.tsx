import { useFetchData } from "@/Hooks/useAxios";
import {
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import { NewsCard } from "@/components/CardsComponents";
import { Heading, HelmetTags } from "@/components/MainComponents";
import PropertiesCategories from "@/components/AsideComponents/PropertiesCategories";
import { ErrorMessage, Loader } from "@/components/SubComponents";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export function Component() {
  const { t, i18n } = useTranslation("Pages_CategoryDetails");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_CategoryDetails",
    `${import.meta.env.VITE_GET_SEO_DATA}/CategoryDetails`
  );
  const { categoryID } = useParams();
  const { isPending, isError, isPaused, data } = useFetchData(
    "CategoryDetails",
    `${import.meta.env.VITE_SINGLE_CATEGORY_DETAILS}${categoryID}`,
    false,
    true,
    categoryID
  );
  if (isError || isPaused) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <ErrorMessage message={t("ErrorMessage")} />
      </div>
    );
  }

  if (isPending) {
    return <Loader className="  h-[calc(100vh-135px)] mb-32" />;
  }

  return (
    <section className="site_container  flex justify-between items-start pt-20 gap-0 lg:gap-16 pb-32 lg:pb-44 lg:flex-col lg:items-center lg:justify-start ">
      <HelmetTags
        title={data?.title + t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/categories/${categoryID}`}
      />

      <section className="category__Details__main--section min-h-screen w-[66%] bg- lg:w-full text-temp_secondary">
        <Heading className="text-center">{data?.title}</Heading>
        <div
          className="flex-center my-5"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>

        <Heading className="my-5 text-2xl">{t("ALL_NEWS")}</Heading>

        <div className="all__properties--wrapper w-full grid-auto-fit mb-10">
          {data?.news?.data?.map((card) => (
            <NewsCard
              key={card?.id}
              className={`${
                data?.news?.data?.length < 3 ? "max-w-[410px]" : "w-full"
              }`}
              card={card}
              t={t}
            />
          ))}
        </div>
      </section>
      <aside className=" category__Details__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
        <PropertiesCategories t={t} />
        <FeaturedPropertiesAside t={t} />
        <RecentlyViewedProperties t={t} />
        <CitiesAside t={t} />
      </aside>
    </section>
  );
}
