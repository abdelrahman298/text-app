import { ICategoryCard } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { LangLink } from "../MainComponents";
import { useExternalData } from "@/Hooks/useAxios";
import { defaultData } from "../../../src/Utilities/style.js";

function CategoryCard({
  card,
  t,
  slider,
}: {
  card: ICategoryCard;
  t: TFunction;
  slider: true | false;
}) {
  const { data: externalData } = useExternalData();

  return (
    <LangLink
      to={`/search?ci=${card?.id}`}
      className={`${
        slider ? "w-full" : "w-60"
      }  aspect-square max-h-60 shadow-md bg-background trns hover:bg-black hover:text-background rounded-lg group flex-col flex-center text-temp_secondary gap-2 border border-temp_secondary`}
    >
      <div className="w-20 aspect-square text-temp_secondary">
        <img src={card?.img} alt={card?.name} className="w-full h-full " />
      </div>
      <h3
        style={{
          color: defaultData.color && defaultData.color,
        }}
        className="text-2xl text-center"
      >
        {card?.name}
      </h3>
      <h4
        style={{
          color: defaultData.color && defaultData.color,
        }}
      >
        {t("CategoryCard.count_formatted", {
          count: card?.count,
        })}
      </h4>
    </LangLink>
  );
}

export default CategoryCard;
