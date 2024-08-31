import { useLocation, useParams, useSearchParams } from "react-router-dom";

import AgentPropertiesForSale from "./AgentPropertiesForSale";
import AgentPropertiesForRent from "./AgentPropertiesForRent";
import AgentInfo from "./AgentInfo";
import { useTranslation } from "react-i18next";
import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import {
  HeadingUnderline,
  HelmetTags,
  SideBarSearchForm,
} from "@/components/MainComponents";
import PropertiesCategories from "@/components/AsideComponents/PropertiesCategories";
import {
  AsideForm,
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import { ErrorMessage, Loader, Share } from "@/components/SubComponents";
import { useState } from "react";
import AgentNews from "./AgentNews";
import AgentProjects from "./AgentsProjects";
import { defaultData } from "../../../Utilities/style.js";

export function Component() {
  const { t, i18n } = useTranslation("Pages_AgentsDetails");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_AgentDetails",
    `${import.meta.env.VITE_GET_SEO_DATA}/AgentDetails`
  );
  const [tab, setTab] = useState("properties_sale");
  const [searchParams, setSearchParams] = useSearchParams();
  const [Category, setCategory] = useState("");
  const { agentID } = useParams();
  // ! Extract query parameter by using uselocation
  // const url = useLocation().pathname;
  // const parts = url.split("/");
  // const userName = parts[parts.length - 1];
  // console.log(agentID, userName);

  const { data: externalData } = useExternalData();

  const { isPending, isError, isPaused, data } = useFetchData(
    "AgentsDetails",
    `${import.meta.env.VITE_BROKER}${agentID}/broker`,
    false,
    false,
    agentID
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
    <section className="site_container  flex justify-between items-start pt-20 gap-0 lg:gap-16 pb-32 lg:pb-44 lg:flex-col lg:items-center lg:justify-start">
      <HelmetTags
        title={data?.[0]?.name + t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/agents/${
          data?.[0]?.id
        }/${data?.[0]?.name?.replace(/\s/g, "-")}`}
      />

      <section className="news__Details__main--section min-h-screen w-[66%] bg- lg:w-full text-temp_secondary">
        <AgentInfo data={data?.[0]} t={t} />
        <Share
          color={defaultData.color}
          className="mt-10 "
          data={{
            facebook: data?.[0]?.facebook,
            twitter: data?.[0]?.twitter,
            google_plus: data?.[0]?.google_plus,
          }}
          t={t}
          type="agent"
        />
        <div className="agent__description--properties--tabs w-full flex flex-col ss:items-center mt-10 bg-grey p-5 rounded-lg">
          <div className="agent__tabs w-fit  flex gap-5 relative h-10 mb-10">
            <button
              style={{
                color: tab !== "properties_sale" ? defaultData.color : "",
              }}
              className={`font-medium trns hover:text-accnt text-lg    hover__underline ${
                tab === "properties_sale"
                  ? "text-accnt before:opacity-100 "
                  : "text-temp_secondary "
              }`}
              onClick={() => {
                setTab("properties_sale");

                setSearchParams(
                  (params) => {
                    params.set("page", "1");
                    return params;
                  },
                  { replace: true }
                );
              }}
            >
              {t("tabs.properties_sale")}
            </button>{" "}
            <button
              style={{
                color: tab !== "properties_rent" ? defaultData.color : "",
              }}
              className={`font-medium trns hover:text-accnt text-lg    hover__underline ${
                tab === "properties_rent"
                  ? "text-accnt before:opacity-100 "
                  : "text-temp_secondary "
              }`}
              onClick={() => {
                setTab("properties_rent");

                setSearchParams(
                  (params) => {
                    params.set("page", "1");
                    return params;
                  },
                  { replace: true }
                );
              }}
            >
              {t("tabs.properties_rent")}
            </button>
            <button
              style={{
                color: tab !== "projects" ? defaultData.color : "",
              }}
              className={`font-medium trns hover:text-accnt text-lg hover__underline ${
                tab === "projects"
                  ? "text-accnt before:opacity-100 "
                  : "text-temp_secondary"
              }`}
              onClick={() => {
                setTab("projects");

                setSearchParams(
                  (params) => {
                    params.set("page", "1");
                    return params;
                  },
                  { replace: true }
                );
              }}
            >
              {t("tabs.projects")}
            </button>
            {/* <button
              style={{
                color: tab !== "description" ? defaultData.color : "",
              }}
              className={`font-medium trns hover:text-accnt text-lg hover__underline ${
                tab === "description"
                  ? "text-accnt before:opacity-100 "
                  : "text-temp_secondary"
              }`}
              onClick={() => setTab("description")}
            >
              {t("tabs.description")}
            </button> */}
            {/* <button
              style={{
                color: tab !== "news" ? defaultData.color : "",
              }}
              className={`font-medium trns hover:text-accnt text-lg hover__underline ${
                tab === "news"
                  ? "text-accnt before:opacity-100 "
                  : "text-temp_secondary"
              }`}
              onClick={() => {
                setTab("news");

                setSearchParams(
                  (params) => {
                    params.set("page", "1");
                    return params;
                  },
                  { replace: true }
                );
              }}
            >
              {t("tabs.news")}
            </button> */}
          </div>

          {/* <p className={`${tab === "description" ? "block" : "hidden"}`}>
            {data?.[0]?.description}
          </p> */}
          <div className={`${tab === "properties_sale" ? "block" : "hidden"}`}>
            <AgentPropertiesForSale t={t} />
          </div>
          <div className={`${tab === "properties_rent" ? "block" : "hidden"}`}>
            <AgentPropertiesForRent t={t} />
          </div>
          {/* <div className={`${tab === "news" ? "block" : "hidden"}`}>
            <AgentNews t={t} />
          </div> */}
          <div className={`${tab === "projects" ? "block" : "hidden"}`}>
            <AgentProjects t={t} />
          </div>
        </div>
      </section>
      <aside className=" SearchProperty__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
        <div className="PROPERTY__OWNER  bg-grey p-6 rounded-lg  flex flex-col items-start gap-9 w-full">
          <HeadingUnderline className="text-start ">
            {t("AsideForm.contact_agent")}
          </HeadingUnderline>
          <AsideForm
            params={{ vendor_id: data?.[0]?.id }}
            api={import.meta.env.VITE_SEND_MESSAGE_TO_AGENT}
            type="message"
            Bgcolor="dark"
            t={t}
          />
        </div>
        <PropertiesCategories setCategory={setCategory} t={t} />

        <SideBarSearchForm setCategory={setCategory} />
        <FeaturedPropertiesAside t={t} />
        <RecentlyViewedProperties t={t} />
        <CitiesAside t={t} />
      </aside>
    </section>
  );
}
