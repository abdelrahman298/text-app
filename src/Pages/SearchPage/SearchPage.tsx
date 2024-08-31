import { useFetchData, usePostData } from "@/Hooks/useAxios";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { lang } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { PropertyCard } from "@/components/CardsComponents";
import { SelectBox } from "@/components/FormComponents";
import {
  HelmetTags,
  Pagination,
  SideBarSearchForm,
} from "@/components/MainComponents";
import {
  ErrorMessage,
  Loader,
  NoItemsMessage,
} from "@/components/SubComponents";
import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { IPropertyCardData } from "@/types/CardsTypes.ts";
import {
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import PropertiesCategories from "@/components/AsideComponents/PropertiesCategories";
import { TFunction } from "i18next";
import { defaultData } from "../../../src/Utilities/style.js";

// ! Function to display the data of property cards
function PropertiesMemoized({
  data,
  t,
}: {
  data: IPropertyCardData[];
  t: TFunction;
}) {
  const user = useAppSelector(userData);
  const dispatchRedux = useAppDispatch();

  return (
    <div className="all__properties--wrapper w-full grid-auto-fit my-10">
      {data?.map((card) => (
        <PropertyCard
          key={card?.id}
          card={card}
          user={user}
          className={`${data?.length < 3 ? "max-w-[410px]" : "w-full"}`}
          ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
          t={t}
        />
      ))}
    </div>
  );
}

export function Component() {
  // const abdoparams = useParams();
  // console.log("params from abdo", abdoparams);

  const [category, setCategory] = useState("");
  const [regionHeader, setRegionHeader] = useState("");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_SearchPage",
    `${import.meta.env.VITE_GET_SEO_DATA}/SearchPage`
  );
  const { t, i18n } = useTranslation("Pages_SearchPage");
  const sortingOptions = [
    { title: t("sorting_select.Featured"), id: 1 },
    { title: t("sorting_select.Normal"), id: 2 },
    { title: t("sorting_select.price_Low"), id: 3 },
    { title: t("sorting_select.price_High"), id: 4 },
  ];
  // ! to read or modify the location URL
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("data from search params", JSON.stringify(searchParams.get("r")));

  const location = useLocation();
  console.log("current location", location.search);

  const lng = useAppSelector(lang);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  // const [isCitySearch, setIsCitySearch] = useState(
  //   searchParams.get("fc") == 1 ? true : false
  // );

  const [isCitySearch, setIsCitySearch] = useState(false);
  const { mutate, isPending, isError, isPaused, data } = usePostData(false);

  // ! return the data of URL into key:value
  const URLParams = Object.fromEntries(searchParams.entries());

  const params = isCitySearch
    ? {
        city: URLParams.c === "-1" ? "" : URLParams.c || "",
        page: page,
      }
    : {
        keyword: URLParams.k || "",
        region: URLParams.r === "-1" ? "" : URLParams.r || "",
        city: URLParams.c === "-1" ? "" : URLParams.c || "",
        country: URLParams.cr === "-1" ? "" : URLParams.cr || "",
        property_type: URLParams.t || "",
        min_beds: URLParams.b || "",
        min_bathes: URLParams.p || "",
        purpose: URLParams.pr || "",
        min_area: URLParams.af || "",
        max_area: URLParams.at || "",
        min_price: URLParams.pf || "",
        max_price: URLParams.pt || "",
        finishing: URLParams.f || "",
        category_id: URLParams.ci || "",
        sale_rent:
          URLParams.sor === "1"
            ? "for_sale"
            : URLParams.sor === "2"
            ? "for_rent"
            : URLParams.sor === "3"
            ? "for_both"
            : "",
        residential_commercial:
          URLParams.roc === "1"
            ? "residential"
            : URLParams.roc === "2"
            ? "commercial"
            : "",
        residential_commercial_sale_rent:
          URLParams.rocsr === "1"
            ? "for_sale"
            : URLParams.rocsr === "2"
            ? "for_rent"
            : "",
        currency: 1,
        page: page,
      };

  //! a search functionality It reacts to changes in the URL parameters
  //! and fetches data based on those changes
  // ! this is THE FUNCTION SEARCH
  useEffect(() => {
    window.scrollTo({ top: 0 });

    //!this logic to handle the search, the search depends only on the changes happened in the url, so the search form, sort by selections, regions section, and pagination don't trigger the search request directly, instead they make a change in the url and this useEffect listens for the changes in the url params then trigger the search request

    //!the search depends on the url only to handle the case of copy and paste the url or bookmark it then open it in a different tab and displaying the same search results

    //!the backend needs to set a key for the normal /featured and another key for price high / low, but in the front the 4 selections are grouped together in th selectbox and in the data (id, title)

    //TODO only  include priority_keys if selected (backend configuration)

    const priority_keys =
      Number(URLParams.srt) == 1
        ? "featured"
        : Number(URLParams.srt) == 2
        ? "normal"
        : null;
    const price_arrange_keys = Number(URLParams.srt) == 4 ? "desc" : "asc";
    const finalData =
      //* CitySearch with priority_keys
      isCitySearch && priority_keys
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
            priority_keys: priority_keys,
          }
        : //* CitySearch without priority_keys
        isCitySearch
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
          }
        : //* not CitySearch and aminities with priority_keys
        priority_keys && location.state?.length > 0
        ? {
            ...params,
            priority_keys: priority_keys,
            aminities: JSON.stringify(location.state),
            price_arrange_keys: price_arrange_keys,
          }
        : //* not CitySearch and aminities without priority_keys
        location.state?.length > 0
        ? {
            ...params,
            aminities: JSON.stringify(location.state),
            price_arrange_keys: price_arrange_keys,
          }
        : //* not CitySearch and no aminities and with priority_keys
        priority_keys
        ? {
            ...params,
            priority_keys: priority_keys,
            price_arrange_keys: price_arrange_keys,
          }
        : //* not CitySearch and no aminities and without priority_keys
          {
            ...params,
            price_arrange_keys: price_arrange_keys,
          };

    mutate({
      api: isCitySearch
        ? import.meta.env.VITE_SEARCH_CITY
        : import.meta.env.VITE_SEARCH_PROPERTY,
      data: finalData,
    });
  }, [
    URLParams.k,
    URLParams.r,
    URLParams.c,
    URLParams.t,
    URLParams.cr,
    URLParams.t,
    URLParams.f,
    URLParams.pr,
    URLParams.p,
    URLParams.b,
    URLParams.af,
    URLParams.at,
    URLParams.pf,
    URLParams.pt,
    URLParams.srt,
    URLParams.fc,
    URLParams.ci,
    URLParams.sor,
    URLParams.roc,
    URLParams.rocsr,
    URLParams.page,
    location.state,
    mutate,
    lng,
  ]);

  const { data: countriesData } = useFetchData(
    "countries",
    import.meta.env.VITE_COUNTRIES_REGISTER,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!data
  );
  const { data: citiesData, refetch: refetchCities } = useFetchData(
    "cities",
    import.meta.env.VITE_ALL_CITIES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!data
  );

  /*  const { data: regionsData, refetch: refetchRegions } = useFetchData(
    "regions",
    `${import.meta.env.VITE_REGIONS_BASED_ON_CITIES_REGISTER}${searchParams.get(
      "c"
    )}`,
    false,
    false,
    //!without adding this as an id, if we click on the city card it will display the regions of the previous city
    searchParams.get("c"),
    30 * 60 * 1000,
    30 * 60 * 1000,
    searchParams.get("c") !== "-1"
  ); */

  const { data: LocationsData } = useFetchData(
    "locations",
    import.meta.env.VITE_ALL_LOCATIONS,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!data
  );

  // ! Extract any location from locationsData
  // ! by using the ID which sent to  "r" from  URLSearch
  // ! and Set heading
  useEffect(() => {
    if (searchParams.get("r") && searchParams.get("r") !== "-1") {
      setRegionHeader(
        LocationsData?.find((item) => item.id == searchParams.get("r"))?.title
      );
    }
  }, [LocationsData, setRegionHeader, searchParams]);

  const { data: PropertyTypesData } = useFetchData(
    "propertyTypes",
    import.meta.env.VITE_PROPERTY_TYPES,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000
  );
  // ! Extract any property type from PropertyTypesData by using the ID which sent to  "t" from  URLSearch

  useEffect(() => {
    if (searchParams.get("t") && searchParams.get("t") !== "-1") {
      setCategory(
        PropertyTypesData?.find((item) => item.id == searchParams.get("t"))
          ?.title
      );
    }
  }, [PropertyTypesData, setCategory, searchParams]);

  function reducer(state, action) {
    switch (action.type) {
      case "setShowMore": {
        return {
          ...state,
          showMore: action.payload,
        };
      }
      case "setCurrentLocationTitle": {
        return {
          ...state,
          currentLocationTitle: action.payload,
        };
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    showMore: false,
    currentLocationTitle: "",
  });

  // ! setCurrentLocationTitle according to the cities and location
  useEffect(() => {
    //! this logic to display the current location title, if there is an id set for the region (r in url) we check in region for the location with that id, and if it is found we will assign its title to the default tile, and if not it will display the default title which is egypt /مصر, and that happens for cities and countries as well
    let LocationTitle = lng === "ar" ? "مصر" : "Egypt";
    if (searchParams.get("r") !== "-1") {
      const title = LocationsData?.find(
        (location) => Number(location.id) === Number(searchParams.get("r"))
      )?.title;

      if (title) {
        LocationTitle = title;
      }
    } else if (searchParams.get("c") !== "-1") {
      const title = citiesData?.find(
        (location) => Number(location.id) === Number(searchParams.get("c"))
      )?.title;

      if (title) {
        LocationTitle = title;
      }
    } else if (searchParams.get("cr") !== "-1") {
      const title = countriesData?.find(
        (location) => Number(location.id) === Number(searchParams.get("cr"))
      )?.title;

      if (title) {
        LocationTitle = title;
      }
    }
    dispatch({ type: "setCurrentLocationTitle", payload: LocationTitle });
  }, [
    LocationsData,
    citiesData,
    countriesData,
    lng,
    searchParams.get("cr"),
    searchParams.get("c"),
    searchParams.get("r"),
  ]);

  // ? we don't use it
  const { data: cats } = useFetchData(
    "PropertiesCategories",
    import.meta.env.VITE_PROPERTIES_CATEGORIES
  );

  return (
    <section className="w-full ">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/search`}
      />

      <section className=" site_container  bg- flex justify-between items-start pt-20 gap-0 lg:gap-16 pb-32 lg:pb-44 lg:flex-col lg:items-center lg:justify-start">
        <section className="SearchProperty__main--section min-h-screen w-[66%] bg- lg:w-full">
          {isError || isPaused ? (
            <ErrorMessage message={t("ErrorMessage")} />
          ) : isPending ? (
            <Loader className="h-[360px] " />
          ) : data?.data?.original?.[0]?.data?.length === 0 ? (
            <NoItemsMessage message={t("NoItemsMessage")} />
          ) : (
            <section className="w-full ">
              {data && (
                <>
                  <div className="selection_options--props--count flex justify-between items-center flex-wrap gap-4 ss:justify-center ss:mb-9 bg-grey p-4 rounded-lg">
                    <h2
                      style={{ color: defaultData.color }}
                      className=" text-xl font-medium ss:text-center uppercase text-temp_secondary "
                    >
                      {t("heading")}
                      {regionHeader !== "" &&
                        searchParams.get("r") !== null &&
                        ` ${
                          i18n.language === "ar"
                            ? `في ${regionHeader}`
                            : `in ${regionHeader}`
                        } `}
                      {((category !== "" && searchParams.get("ci") !== null) ||
                        (category !== "" && searchParams.get("t") !== null)) &&
                        ` ${
                          i18n.language === "ar"
                            ? ` [ ${category} ]`
                            : ` [ ${category} ]`
                        } `}
                      <span>( {data?.data?.original?.[1]?.total_props} )</span>
                    </h2>
                    <div className="min-w-[160px]">
                      <SelectBox
                        placeholder={t("sorting_select.placeholder")}
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                        data={sortingOptions}
                        getDefaultValueFromURL="srt"
                      />
                    </div>
                  </div>

                  {/*  <h2 className="Properties_counts text-base opacity-120 mt-3 ss:text-center">
                    ( {data?.data?.original?.[1]?.total_props} ){" "}
                    {t("properties_word")}{" "}
                    {data?.data?.original?.[1]?.featured_count > 0 && (
                      <span className="bg-red-500 text-background px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm mx-3">
                        {data?.data?.original?.[1]?.featured_count}{" "}
                        {t("featured_word")}
                      </span>
                    )}
                    {data?.data?.original?.[1]?.normal_count > 0 && (
                      <span className="bg-temp_secondary text-background px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm ">
                        {data?.data?.original?.[1]?.normal_count}{" "}
                        {t("normal_word")}
                      </span>
                    )}
                  </h2> */}
                </>
              )}
              <PropertiesMemoized
                data={data?.data?.original?.[0]?.data}
                t={t}
              />

              {data?.data?.original?.[0]?.meta?.last_page > 1 && (
                <Pagination
                  page={page}
                  t={t}
                  setPage={setPage}
                  lastPage={data?.data?.original?.[0]?.meta?.last_page}
                />
              )}
            </section>
          )}
        </section>
        <aside className=" SearchProperty__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
          <SideBarSearchForm setCategory={setCategory} />
          <PropertiesCategories setCategory={setCategory} t={t} />
          <FeaturedPropertiesAside t={t} />
          <RecentlyViewedProperties t={t} />

          <CitiesAside t={t} />
        </aside>
      </section>
    </section>
  );
}
