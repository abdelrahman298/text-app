import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import { memo } from "react";
import { HeadingUnderline, LangLink } from "../MainComponents";
import { TFunction } from "i18next";
import { defaultData } from "../../../src/Utilities/style.js";

interface ICityCardData {
  id: number;
  image: string;
  title: string;
  properties: number;
}
const CitiesAside = memo(function CitiesAside({ t }: { t: TFunction }) {
  const { data } = useFetchData(
    "citiesAside",
    import.meta.env.VITE_ALL_CITIES,
    false,
    false,
    "",
    60 * 1000,
    60 * 1000,
    true
  );
  const { data: externalData } = useExternalData();

  if (data?.length < 1) {
    return;
  }
  return (
    <section className="w-full px-6">
      <HeadingUnderline textcolor={defaultData.color} className="mb-9">
        {t("CitiesAside.title")}
      </HeadingUnderline>
      <div className="CitiesAside__slider h-auto w-full grid grid-cols-2 sm:grid-cols-1 gap-7">
        {data?.slice(0, 4)?.map((card: ICityCardData) => (
          <LangLink
            to={`/search?k=${card.title?.replace(/\s/g, "-")}&fc=1&cr=-1&c=${
              card.id
            }&r=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=&page=1`}
            key={card?.id}
            target="_blank"
            className=" w-full flex flex-col justify-start items-start sm:items-center gap-  hover:-translate-y-3 transition-transform ease-in-out duration-700 text-temp_secondary "
          >
            <div className="shadow-md w-full aspect-[3/2] overflow-hidden">
              <img
                className="w-full h-full min-w-[80px] object-cover  rounded-md"
                src={card?.image}
                alt={card?.title}
                loading="lazy"
              />
            </div>
            <h3
              style={{ color: defaultData.color }}
              title={card?.title}
              className="text-lg font-medium line-clamp-1 mt-2"
            >
              {card?.title}
            </h3>
            <h4
              style={{ color: defaultData.color }}
              className="opacity-70  text-sm line-clamp-1"
            >
              {card?.properties} {t("CitiesAside.properties_word")}
            </h4>
          </LangLink>
        ))}
      </div>
    </section>
  );
});
export default CitiesAside;
