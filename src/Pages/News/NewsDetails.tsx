import { useFetchData } from "@/Hooks/useAxios";
import {
  CitiesAside,
  FeaturedPropertiesAside,
  RecentlyViewedProperties,
  PropertiesCategories,
} from "@/components/AsideComponents";
import { NewsCard } from "@/components/CardsComponents";
import {
  Heading,
  HelmetTags,
  LangLink,
  SideBarSearchForm,
} from "@/components/MainComponents";
import { ErrorMessage, Loader, Share } from "@/components/SubComponents";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Component() {
  const { t, i18n } = useTranslation("Pages_NewsDetails");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_NewsDetails",
    `${import.meta.env.VITE_GET_SEO_DATA}/NewsDetails`
  );
  // const { newsId } = useParams();
  const { newsId } = useParams();

  const { isPending, isError, isPaused, data } = useFetchData(
    "NewsDetails",
    // `${import.meta.env.VITE_SINGLE_NEW_DETAILS}${newsName?.replace(/-/g, " ")}`,
    `${import.meta.env.VITE_SINGLE_NEW_DETAILS}${newsId}`,
    false,
    true,
    // ! must have id
    newsId
    // newsName?.replace(/-/g, " ")
  );
  // console.log("from newsdetails  Stringify JSON " + data);
  // console.log(`API  ${import.meta.env.VITE_SINGLE_NEW_DETAILS}${newsId}`);
  // console.log("from newsdetails  " + newsId);

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
        title={data?.title + t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/news/${data?.title?.replace(/\s/g, "-")}`}
      />

      <section className="news__Details__main--section min-h-screen w-[66%] bg- lg:w-full text-temp_secondary">
        <div className="   w-full h-fit">
          <img
            className=" min-h-[450px]  max-h-[450px] h-[450px] md:min-h-fit md:h-auto w-full object-cover"
            src={data?.image}
            alt={data?.title}
          />
        </div>
        <div className="news__author--date flex justify-start  gap-16 ss:gap-5 axs:gap-3 mt-5">
          <LangLink
            to={`/agents/${
              data?.agent_info?.[0]?.id
            }/${data?.agent_info?.[0]?.name?.replace(/\s/g, "-")}`}
            className="agent__details  flex justify-start items-center  gap-3 max-w-[50%] sm:max-w-[65%]"
          >
            <Avatar className="  group w-14 axs:w-12   p-1">
              <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border rounded-full border-dashed inset-0 absolute "></div>
              <AvatarImage
                className="object-cover rounded-full"
                src={data?.agent_info?.[0]?.logo}
              />
              <AvatarFallback>
                {data?.agent_info?.[0]?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                {data?.agent_info?.[0]?.name?.split(" ")?.[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <p className=" truncate max-w-full ">
              {data?.agent_info?.[0]?.name}{" "}
            </p>
          </LangLink>
          <h2 className="flex items-center gap-2 min-w-fit">
            <FontAwesomeIcon className=" " icon={faCalendarDays} />
            <span className="text-sm axs:text-xs">{data?.created_at} </span>
          </h2>
        </div>
        <h1 className="mt-7 mb-5 font-medium text-2xl">{data?.title} </h1>
        <div
          id="NewsDetails__description"
          className="test mb-5 "
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>
        <Share
          data={{
            facebook: data?.facebook,
            twitter: data?.twitter,
            google_plus: data?.google_plus,
          }}
          t={t}
          type="article"
        />
        <Heading className="mb-5 mt-12">{t("LATEST_NEWS")}</Heading>
        <div className="all__properties--wrapper w-full grid-auto-fit my-10">
          {data?.latest_news.map((card) => (
            <NewsCard
              key={card?.id}
              className={`${
                data?.latest_news?.length < 3 ? "max-w-[410px]" : "w-full"
              }`}
              card={card}
              t={t}
            />
          ))}
        </div>
      </section>
      <aside className=" SearchProperty__aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16">
        <SideBarSearchForm />
        <PropertiesCategories t={t} />
        <FeaturedPropertiesAside t={t} />
        <RecentlyViewedProperties t={t} />
        <CitiesAside t={t} />
      </aside>
    </section>
  );
}
