import { useFetchData, useFetchPaginatedData } from "@/Hooks/useAxios";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import {
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import {
  Heading,
  HelmetTags,
  Pagination,
  SideBarSearchForm,
} from "@/components/MainComponents";
import PropertiesCategories from "@/components/AsideComponents/PropertiesCategories";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { PropertyCard } from "@/components/CardsComponents";

export function Component() {
  const { t, i18n } = useTranslation("Pages_AllProperties");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_AllProperties",
    `${import.meta.env.VITE_GET_SEO_DATA}/AllProperties`
  );
  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);

  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const { isPending, isError, isPaused, data, isFetching } =
    useFetchPaginatedData(
      "AllProperties",
      page,
      `${import.meta.env.VITE_ALL_PROPERTIES}all?limit=${
        import.meta.env.VITE_PAGINATION_LIMIT
      }&page=${page}`,
      false,
      5000,
      0,
      true,
      false,
      true
    );

  return (
    <section className="w-full ">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/properties`}
      />

      <section className=" site_container  flex  justify-between items-start  pt-20 gap-0 lg:gap-16 pb-32 lg:pb-44 lg:flex-col lg:items-center lg:justify-start">
        <section className="all__properties__main--section min-h-screen w-[66%] bg- lg:w-full">
          {" "}
          <Heading className="text-center">{t("heading")}</Heading>
          <div className="all__properties--wrapper w-full grid-auto-fit my-10">
            {isError || isPaused ? (
              <ErrorMessage message={t("ErrorMessage")} />
            ) : isPending ? (
              <Loader className="h-[360px] " />
            ) : data?.data?.length === 0 ? (
              <NoItemsMessage message={t("NoItemsMessage")} />
            ) : (
              data?.data?.map((card) => (
                <PropertyCard
                  className={`${
                    data?.data?.length < 3 ? "max-w-[410px]" : "w-full"
                  }`}
                  key={card?.id}
                  card={card}
                  user={user}
                  ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
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
        <aside className=" all__properties__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
          <SideBarSearchForm />
          <PropertiesCategories t={t} />
          <FeaturedPropertiesAside t={t} />
          <RecentlyViewedProperties t={t} />
          <CitiesAside t={t} />
          {/*
           

         
          <Link aria-label="ads" to="/ad">
            <img
              className="w-full max-w-sm h-auto object-cover"
              src="/assets/verticalAd.jpg"
              alt="verticalAd"
            />
          </Link>
        */}
        </aside>
      </section>
    </section>
  );
}
