import { useFetchData } from "@/Hooks/useAxios";
import {
  AsideForm,
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
} from "@/components/AsideComponents";
import {
  Heading,
  HeadingUnderline,
  HelmetTags,
  ItemFeaturesList,
  ItemSlider,
  LangLink,
  SideBarSearchForm,
} from "@/components/MainComponents";
import {
  ErrorMessage,
  LightBox,
  Loader,
  Share,
} from "@/components/SubComponents";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ProjectQuickSummary from "./ProjectQuickSummary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Component() {
  const { t, i18n } = useTranslation("Pages_ProjectDetails");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_ProjectDetails",
    `${import.meta.env.VITE_GET_SEO_DATA}/ProjectDetails`
  );
  const { projectNumber } = useParams();

  const { isPending, isError, isPaused, data } = useFetchData(
    "ProjectDetails",
    `${import.meta.env.VITE_SINGLE_PROJECT_DETAILS}${projectNumber}`,
    false,
    true,
    projectNumber
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
    <section className="site_container  flex justify-between items-start pt-20 gap-0 lg:gap-16 pb-44 lg:flex-col lg:items-center lg:justify-start">
      <HelmetTags
        title={data?.name + t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${
          i18n.language
        }/projects/${projectNumber}/${data?.name?.replace(/\s/g, "-")}`}
      />

      <section className="news__Details__main--section min-h-screen flex flex-col gap-16 w-[66%] bg- lg:w-full text-temp_secondary">
        <div className="project__general--info w-full">
          <Heading className="mb-3 text-start">{data?.name}</Heading>
          <h2 className="project__address text-base  mt-1  mb-10 text-justify">
            {data?.region}
            {","} {data?.city}
            {","} {data?.country}
          </h2>
          <ItemSlider className="mb-10" data={data} />

          <Share
            data={{
              facebook: data?.facebook,
              twitter: data?.twitter,
              google_plus: data?.google_plus,
            }}
            t={t}
            type="project"
          />
        </div>
        <div className="project__description">
          <HeadingUnderline className="text-2xl">
            {t("headings.description")}
          </HeadingUnderline>
          <div
            className="mt-7  "
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
        </div>
        {data &&
          data?.quick_summary &&
          Object.keys(data?.quick_summary)?.length > 0 && (
            <div className="project__Quick--summary w-full">
              <HeadingUnderline className="text-2xl">
                {t("headings.QuickSummary")}
              </HeadingUnderline>
              <ProjectQuickSummary
                className="mt-7"
                t={t}
                data={data?.quick_summary}
              />
            </div>
          )}{" "}
        {data?.aminities?.length > 0 && (
          <div className="project__BENEFITS--aminities w-full">
            <HeadingUnderline className="text-2xl">
              {t("headings.aminities")}
            </HeadingUnderline>
            <ItemFeaturesList className="mt-7" data={data?.aminities} />
          </div>
        )}
        {data?.autocad?.length > 0 && (
          <div className="project__BENEFITS--aminities w-full">
            <HeadingUnderline className="text-2xl mb-10">
              {t("headings.AUTOCAD")}{" "}
            </HeadingUnderline>

            <LightBox data={data?.autocad} />
          </div>
        )}
        <div className="project__location ">
          <HeadingUnderline className="text-2xl">
            {t("headings.LOCATION")}
          </HeadingUnderline>
          <div
            className="iframe__fixed--height w-full border-2 border-temp_secondary rounded-md  mt-7 "
            dangerouslySetInnerHTML={{
              __html: data?.location,
            }}
          ></div>
        </div>
        <div className="project__VIDEO">
          <HeadingUnderline className="text-2xl">
            {t("headings.VIDEO")}
          </HeadingUnderline>
          <iframe
            loading="lazy"
            className="  w-full !aspect-video overflow-hidden border-2 border-temp_secondary rounded-md mt-7"
            src={`https://www.youtube.com/embed/${data?.video?.substring(32)}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <aside className=" SearchProperty__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
        <section className="PROPERTY__OWNER  bg-grey p-6 rounded-lg  flex flex-col items-start  gap-9 w-full text-temp_secondary">
          <HeadingUnderline>{t("AsideForm.contact_agent")}</HeadingUnderline>

          <LangLink
            to={`/agents/${
              data?.broker_details?.[0]?.id
            }/${data?.broker_details?.[0]?.name?.replace(/\s/g, "-")}`}
            className="PROPERTY__OWNER--details flex justify-start items-start gap-5 bg- w-full"
          >
            <Avatar className=" rounded-none  w-28 max-w-[112px] aspect-auto">
              <AvatarImage
                className="object-cover "
                src={data?.broker_details?.[0]?.logo}
              />
              <AvatarFallback className="rounded-none w-28 aspect-square bg-background text-temp_secondary text-xl">
                {data?.broker_details?.[0]?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                {data?.broker_details?.[0]?.name?.split(" ")?.[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="PROPERTY__OWNER--name--description">
              <h3 className="text-lg font-medium">
                {data?.broker_details?.[0]?.name}
              </h3>
              {data?.broker_details?.[0]?.description && (
                <p className="text-sm opacity-70">
                  {data?.broker_details?.[0]?.description}
                </p>
              )}
            </div>
          </LangLink>

          <div className="PROPERTY__OWNER--name--contact-info w-full flex flex-col gap-3">
            {data?.broker_details?.[0]?.phone && (
              <a
                rel="noreferrer"
                href={`tel:${data?.broker_details?.[0]?.phone}`}
                className="flex justify-start items-center gap-3"
              >
                <span className="font-medium"> {t("aside.Phone")}</span>
                <span className="text-  opacity-70">
                  {data?.broker_details?.[0]?.phone}
                </span>
              </a>
            )}
            {data?.broker_details?.[0]?.mobile && (
              <a
                rel="noreferrer"
                href={`tel:${data?.broker_details?.[0]?.mobile}`}
                className="flex justify-start items-center gap-3"
              >
                <span className="font-medium">{t("aside.Mobile")} </span>
                <span className="text-  opacity-70">
                  {data?.broker_details?.[0]?.mobile}
                </span>
              </a>
            )}
            {data?.broker_details?.[0]?.email && (
              <a
                rel="noreferrer"
                href={`mailto:${data?.broker_details?.[0]?.email}`}
                className="flex justify-start items-center gap-3 "
              >
                <span className="font-medium min-w-fit">
                  {t("aside.Email")}
                </span>
                <span className="text-  opacity-70">
                  {data?.broker_details?.[0]?.email}
                </span>
              </a>
            )}
          </div>
          <div className="PROPERTY__OWNER--separator w-3/4 h-[1px] bg-temp_secondary opacity-20"></div>
          <AsideForm
            params={{ vendor_id: data?.broker_details?.[0]?.id }}
            api={import.meta.env.VITE_SEND_MESSAGE_TO_AGENT}
            type="message"
            Bgcolor="dark"
            t={t}
          />
        </section>
        <SideBarSearchForm />
        <FeaturedPropertiesAside t={t} />
        <RecentlyViewedProperties t={t} />
        <CitiesAside t={t} />
      </aside>
    </section>
  );
}
