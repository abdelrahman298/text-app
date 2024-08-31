import { cn } from "@/lib/utils";
import { IProjectCardData } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { memo } from "react";
import { LangLink } from "../MainComponents";

type ProjectCardProps = {
  card: IProjectCardData;
  t: TFunction;
  className?: string;
  color?: string | any;
};
const ProjectCard = memo(function ProjectCard({
  card,
  t,
  className,
  color,
}: ProjectCardProps) {
  return (
    <div
      className={cn(` group   relative     w-full bg-transparent  `, className)}
    >
      <div className="for__shadow shadow-lg w-full h-auto hover:-translate-y-2  transition-all duration-500 ease-in-out">
        <LangLink
          to={`/projects/${card?.listing_number}/${card?.title?.replace(
            /\s/g,
            "-"
          )}`}
          className="img__wrapper w-full h-[350px] overflow-hidden round relative block group"
        >
          <img
            className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
            src={card?.image}
            alt={card?.title}
            loading="lazy"
          />
        </LangLink>

        <div
          style={{ color: color }}
          className="project__details  w-full text-temp_secondary   bg-grey p-5"
        >
          <LangLink
            to={`/projects/${card?.listing_number}/${card?.title?.replace(
              /\s/g,
              "-"
            )}`}
            title={card?.title}
            className="project--title text-lg font-medium  w-fit truncate"
          >
            {card?.title}
            <span className="text-sm opacity-80 font-normal mx-1">
              {card?.region}
            </span>
          </LangLink>

          <h5
            dangerouslySetInnerHTML={{ __html: card?.description }}
            className="project--location text-base mt-3    text-justify line-clamp-2"
          ></h5>
          <hr className="border-[1px] border-temp_secondary mb-3 mt-5" />
          <LangLink
            color={color}
            className="!w-fit mx- mt-5"
            to={`/projects/${card?.listing_number}/${card?.title?.replace(
              /\s/g,
              "-"
            )}`}
            id="custom__btn"
          >
            <span>{t("ProjectCard.CTA_txt")}</span>
          </LangLink>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
