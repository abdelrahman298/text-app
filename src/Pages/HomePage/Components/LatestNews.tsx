import { NewsCard } from "@/components/CardsComponents";
import {
  DashedSeparator,
  HeadingTwo,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import { TFunction } from "i18next";
import { INewsCardData } from "@/types/CardsTypes";
import { useExternalData } from "@/Hooks/useAxios";
// import { defaultData } from "../../../src/Utilities/style.js";

interface ILatestNewsProps {
  t: TFunction;
  data: {
    cards: INewsCardData[];
    title: string;
    sub_title: string;
  };
  color?: {
    basic_color?: string;
    secondary_color?: string;
    temp_color?: string;
  };
}

function LatestNews({ data, t, color }: ILatestNewsProps) {
  const { data: externalData } = useExternalData();

  if (data?.cards?.length < 1) {
    return;
  }

  return (
    <section className="  site_container min-h-[700px]  py-10 flex flex-col items-center">
      <HeadingTwo color={color}>{data?.title}</HeadingTwo>
      <SubHeading color={color}>{data?.sub_title} </SubHeading>
      <DashedSeparator color={color} />

      <div className="latest__news--cards w-full grid-auto-fit my-10 min-h-[400px] ">
        {/*  //! 410 = 1300 - (2 * 35) / 3 */}
        {data?.cards?.map((card) => (
          <NewsCard
            key={card?.id}
            className={`${
              data?.cards?.length < 3 ? "max-w-[410px]" : "w-full"
            }`}
            card={card}
            t={t}
          />
        ))}
      </div>
      <LangLink
        color={color}
        className="!w-fit mx-auto custom__btn__accent"
        to="/news"
        id="custom__btn"
      >
        <span>{t("LatestNews.main_CTA")}</span>
      </LangLink>
    </section>
  );
}

export default LatestNews;
