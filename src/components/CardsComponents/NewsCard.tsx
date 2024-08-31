import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

import LangLink from "../MainComponents/LangLink.tsx";
import { INewsCardData } from "@/types/CardsTypes.ts";
import { TFunction } from "i18next";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
import { cn } from "@/lib/utils.ts";
import { useExternalData } from "@/Hooks/useAxios.tsx";
import { defaultData } from "../../../src/Utilities/style.js";

type NewsCardProps = {
  card: INewsCardData;
  t: TFunction;
  className?: string;
  alignment?: "vertical" | "horizontal";
};
const NewsCard = memo(function NewsCard({
  card,
  t,
  className,
  alignment = "vertical",
}: NewsCardProps) {
  const { data: externalData } = useExternalData();

  return (
    <div
      className={cn(` group   relative     w-full bg-transparent  `, className)}
    >
      <div
        className={`for__shadow shadow-lg w-full h-auto hover:-translate-y-2  transition-all duration-500 ease-in-out ${
          alignment === "vertical" ? "" : "flex gap-5"
        }`}
      >
        <div
          key={card?.id}
          className={`img-card-wrapper  ${
            alignment === "vertical"
              ? "w-full  h-[250px] max-w-full"
              : "w-1/2  h-[350px] max-w-[50%]"
          }   round relative  group`}
        >
          <div className="img__wrapper  h-full overflow-hidden round w-full">
            <LangLink
              // to={`/news/${card?.title?.replace(/\s/g, "-")}`}>
              to={`/news/${card?.id}`}
            >
              {" "}
              <img
                className="w-full h-full object-cover cursor-pointer group-hover:scale-110 trns"
                src={card?.image}
                alt={card?.title}
                loading="lazy"
              />
            </LangLink>
          </div>
        </div>

        <div
          style={{ color: defaultData.color }}
          className={`property__details bg-background  h-fit  text-temp_secondary pt-5   ${
            alignment === "vertical" ? "w-full  " : "w-1/2  h-auto max-w-[50%]"
          }`}
        >
          <LangLink
            to={`/news/categories/${card?.news_category?.id}`}
            textcolor={defaultData.color.basic_color}
            className="property__type pl-2 rtl:pl-0 rtl:pr-2  mb-1 text-temp_secondary font-medium text-lg border-l-2 ml-3 rtl:ml-0 rtl:mr-3 border-l-temp_secondary rtl:border-l-0 rtl:border-r-2 rtl:border-r-temp_secondary  h-fit leading- rtl:rtl "
          >
            {card?.news_category?.main_title}
          </LangLink>
          <div className="new__titles p-3">
            <LangLink
              // to={`/news/${card?.title?.replace(/\s/g, "-")}`}
              to={`/news/${card?.id}`}
              className="h-fit text-xl leading-7 font-medium  line-clamp-1 "
              title={card?.title}
              textcolor={defaultData.color.basic_color}
            >
              {card?.title}
            </LangLink>
          </div>
          <div className="news--summary p-3">
            <h5
              dangerouslySetInnerHTML={{ __html: card?.summary }}
              className=" text-base  line-clamp-1 opacity-70 "
              style={{ color: defaultData.color.basic_color }}
            ></h5>
          </div>
          <div
            className={`property__details--bottom  px-3 py-5 
         flex justify-between items-center h-fit w-full gap-1 rtl:ltr ${
           alignment === "vertical" ? "bg-grey  " : "bg-background"
         }`}
          >
            <LangLink
              to={`/agents/${
                card?.agent_info?.[0]?.id
              }/${card?.agent_info?.[0]?.name?.replace(/\s/g, "-")}`}
              title={card?.agent_info?.[0]?.name}
              textcolor={defaultData.color.basic_color}
              className="agent__details w-3/5 flex justify-start items-center  gap-3 max-w-[60%] "
            >
              <Avatar className="  group w-12  p-1">
                <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border rounded-full border-dashed inset-0 absolute "></div>
                <AvatarImage
                  className="object-cover rounded-full"
                  src={card?.agent_info?.[0]?.img}
                />
                <AvatarFallback>
                  {card?.agent_info?.[0]?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                  {card?.agent_info?.[0]?.name?.split(" ")?.[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <p className="text-xs truncate max-w-full opacity-70">
                {card?.agent_info?.[0]?.name}
              </p>
            </LangLink>
            <div className="news__bottom--statistics flex flex-wrap items-center justify-end gap-3 opacity-70 text-xs">
              <span
                style={{ color: defaultData.color.basic_color }}
                className="flex gap-1 font- items-center"
              >
                <FontAwesomeIcon icon={faEye} />

                {t("NewsCard.count_formatted", {
                  count: card?.views,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewsCard;
