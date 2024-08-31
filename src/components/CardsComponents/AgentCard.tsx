import { IAgentCardData } from "@/types/CardsTypes";
import { LangLink } from "../MainComponents";
import { cn } from "@/lib/utils";
import { TFunction } from "i18next";
import { useExternalData } from "@/Hooks/useAxios";
import { defaultData } from "../../../src/Utilities/style.js";

function AgentCard({
  card,
  className,
  slider,
  t,
  showAllDetails,
  color,
}: {
  card: IAgentCardData;
  className?: string;
  slider?: true | false;
  t?: TFunction;
  showAllDetails?: boolean;
  color?: {
    basic_color?: string;
    secondary_color?: string;
  };
}) {
  const { data: externalData } = useExternalData();

  return (
    <LangLink
      to={`/agents/${card?.id}/${card?.name?.replace(/\s/g, "-")}`}
      className={cn(
        `${
          slider ? "w-full" : "w-60"
        }  aspect-[2/4] max-h-[420px] ss:max-h-[520px] shadow-md   text-temp_secondary rounded-lg group relative  flex-col flex justify-end overflow-hidden items-center bg-background  p-1`,
        className
      )}
    >
      <div className=" overflow-hidden  w-[100%] h-full rounded-lg">
        <img
          className=" object-cover block group-hover:scale-110 transition-transform duration-700 ease-in-out w-full h-full  "
          src={card?.img}
          alt={card?.name}
        />
      </div>

      <div
        className={`absolute z-40 right-0 w-full ${
          showAllDetails
            ? "h-full -bottom-[75%] flex flex-col items-center pt-5 group-hover:pt-16"
            : "h-20 -bottom-2 flex-center flex-col"
        }   bg-background group-hover:-bottom-0   trns px-5`}
      >
        <h3
          style={{ color: color?.basic_color }}
          className="text-3xl font-medium"
        >
          {card?.name}
        </h3>
        <h4
          style={{ color: color?.basic_color }}
          className="opacity-70 text-center line-clamp-1"
        >
          {t?.("AgentCard.count_formatted", {
            count: card?.count,
          })}
        </h4>
        {showAllDetails && (
          <p className="opacity-70 my-10 line-clamp-4 text-justify">
            {card?.description}
          </p>
        )}
        {showAllDetails && (
          <LangLink
            className="!w-fit mx-auto mt-5"
            to={`/agents/${card?.id}/${card?.name?.replace(/\s/g, "-")}`}
            id="custom__btn"
            color={defaultData.color}
          >
            <span>{t?.("AgentCard.CTA_txt")}</span>
          </LangLink>
        )}
      </div>
    </LangLink>
  );
}

export default AgentCard;
