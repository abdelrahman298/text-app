import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import {
  DashedSeparator,
  HeadingTwo,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { PropertyCard } from "@/components/CardsComponents";
import { CountersNumbers } from "@/components/SubComponents";
import { ICounterData, IPropertyCardData } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { useExternalData } from "@/Hooks/useAxios";
import bgMost from "./../../../../public/assets/bg-most-views.jpeg";
import { defaultData } from "../../../Utilities/style";

interface ILatestPropertiesProps {
  t: TFunction;
  color?: {
    basic_color: string;
    secondary_color: string;
  };
  data: {
    main_cards: IPropertyCardData[][];
    other_cards: IPropertyCardData[][];
    title: string;
    sub_title: string;
    image: string;
  };

  countersData: ICounterData[];
}

const LatestProperties = memo(function LatestProperties({
  color,
  data,
  countersData,
  t,
}: ILatestPropertiesProps) {
  const user = useAppSelector(userData);
  const dispatchRedux = useAppDispatch();
  const { data: externalData } = useExternalData();
  // const currentData = data.main_cards[0];
  if (data?.main_cards?.[0].length + data?.other_cards?.length < 1) {
    return;
  }

  return (
    <section
      style={{
        backgroundImage: `url('${bgMost}'), linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5))`,
      }}
      className="h-auto w-full bg-fixed bg-no-repeat  bg-center bg-cover bg-blend-overlay mt-[106px] sm:mt-52 pt-20 lg:pt-28 sm:pt-52 relative "
    >
      <div className="counters__numbers absolute site_container h-fit  top-0 -translate-y-1/2 left-1/2 -translate-x-1/2  ">
        <CountersNumbers countersData={countersData} />
      </div>
      <section className="relative z-10  py-20 flex flex-col items-center site_container min-h-[550px] ">
        <HeadingTwo className="text-background">{data?.title}</HeadingTwo>
        <SubHeading className="text-background">{data?.sub_title} </SubHeading>
        <DashedSeparator className="text-background" />

        <div className="LatestProperties__wrapper w-full flex justify-between items-start  gap-[35px] lg:flex-col lg:items-center my-10">
          <div
            className="LatestProperties__main
          lg:w-full  3xl:w-[365px] 5xl:w-[440px] 6xl:w-[510px]  w-[40%]
             bg-red- flex flex-col gap-[35px]"
          >
            {data?.main_cards?.[0]?.map((card) => (
              <PropertyCard
                key={card?.id}
                card={card}
                t={t}
                color={color}
                /*  className={`${
                  data?.main_cards?.[0]?.length < 3 ? "max-w-[410px]" : "w-full"
                }`} */
                user={user}
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              />
            ))}
          </div>

          <div className="LatestProperties--cards lg:w-full  3xl:w-[540px] 5xl:w-[635px] 6xl:w-[755px]  w-[56%] grid-homepage-customized  min-h-[500px]   ">
            {data?.other_cards?.[0]?.map((card) => (
              <PropertyCard
                key={card?.id}
                card={card}
                t={t}
                className={`${
                  data?.other_cards?.[0]?.length < 3
                    ? "max-w-[410px]"
                    : "w-full"
                }`}
                user={user}
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              />
            ))}
          </div>
        </div>
        <LangLink
          color={defaultData.color}
          className="!w-fit mx-auto custom__btn__accent "
          to="/properties"
          id="custom__btn"
        >
          <span>{t("LatestProperties.main_CTA")}</span>
        </LangLink>
      </section>
    </section>
  );
});

export default LatestProperties;
