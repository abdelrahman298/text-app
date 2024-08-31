import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  useFetchData,
  useFetchPaginatedData,
  useExternalData,
} from "@/Hooks/useAxios";
import { Heading, HelmetTags, Pagination } from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { ProjectCard } from "@/components/CardsComponents";
import { IProjectCardData } from "@/types/CardsTypes";
import { defaultData } from "../../../src/Utilities/style.js";

export function Component() {
  const { data: externalData } = useExternalData();

  const { t, i18n } = useTranslation("Pages_Projects");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_Projects",
    `${import.meta.env.VITE_GET_SEO_DATA}/Projects`
  );

  let [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const { isPending, isError, isPaused, data } = useFetchPaginatedData(
    "Projects",
    page,
    import.meta.env.VITE_PROJECTS

    // `${import.meta.env.VITE_PROJECTS}?limit=${
    //   import.meta.env.VITE_PAGINATION_LIMIT
    // }&page=${page}`
  );

  return (
    <section className=" site_container  pt-20  pb-32">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/projects`}
      />
      <Heading color={defaultData.color} className={"text-center"}>
        {t("heading")}
      </Heading>

      <div className="all__Projects--wrapper w-full grid-auto-fit my-10 ">
        {isError || isPaused ? (
          <ErrorMessage message={t("ErrorMessage")} />
        ) : isPending ? (
          <Loader className="h-[360px] " />
        ) : data?.data?.length === 0 ? (
          <NoItemsMessage message={t("NoItemsMessage")} />
        ) : (
          data?.data?.map((card: IProjectCardData) => (
            <ProjectCard
              color={defaultData.color}
              key={card?.id}
              className={`${
                data?.data?.length < 3 ? "max-w-[410px]" : "w-full"
              }`}
              card={card}
              t={t}
            />
          ))
        )}
      </div>
      {data?.meta?.last_page > 1 && (
        <Pagination
          page={page}
          t={t}
          setPage={setPage}
          lastPage={data?.meta?.last_page}
        />
      )}
    </section>
  );
}
