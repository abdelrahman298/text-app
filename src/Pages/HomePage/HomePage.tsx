import { HelmetTags, SearchForm } from "@/components/MainComponents";
import Hero from "./Components/Hero";
import FeaturedProperties from "./Components/FeaturedProperties";
import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import { useTranslation } from "react-i18next";
import AboutUs from "./Components/AboutUs";
import LatestProperties from "./Components/LatestProperties";
import FixedBgImg from "./Components/FixedBgImg";
import OurAgents from "./Components/OurAgents";
import Testimonials from "./Components/Testimonials";
import LatestNews from "./Components/LatestNews";
import { CategoriesSlider } from "@/components/SubComponents";
import PopularPlaces from "./Components/PopularPlaces";
import { defaultData } from "../../Utilities/style";

export function Component() {
  const { data: externalData } = useExternalData();

  const { t, i18n } = useTranslation("Pages_HomePage");
  const { data } = useFetchData(
    "HomePage",
    `${import.meta.env.VITE_LANDING_PAGE}?country_id=1`,
    false,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000,
    true,
    false,
    "",

    true
  );

  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_HomePage",
    `${import.meta.env.VITE_GET_SEO_DATA}/HomePage`
  );

  return (
    <>
      <HelmetTags
        title={t("tab.title", {
          name:
            i18n.language === "en"
              ? `${defaultData?.name_en || ""}`
              : `${defaultData?.name_ar || ""}`,
        })}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical=""
      />
      <Hero data={data?.sliders} />
      <SearchForm formFor="hero" />
      <FeaturedProperties
        color={defaultData?.color}
        data={data?.featured_properties}
        ads={data?.ads}
        t={t}
      />
      <AboutUs data={data?.descripe_us?.[0]} />

      <LatestProperties
        color={defaultData?.color}
        data={data?.most_view_deals}
        countersData={data?.our_features}
        t={t}
      />
      <CategoriesSlider data={data?.all_props_categories} t={t} />
      {/* <FixedBgImg data={data?.market_section?.[0]} t={t} /> */}
      <PopularPlaces
        color={defaultData.color}
        data={data?.cities_most_pops}
        t={t}
      />
      <OurAgents color={defaultData.color} data={data?.our_agents} t={t} />
      <Testimonials color={defaultData.color} data={data?.testimonials} t={t} />
      <LatestNews color={defaultData.color} data={data?.news} t={t} />
    </>
  );
}
