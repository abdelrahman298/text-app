import { memo } from "react";

import { TFunction } from "i18next";
import { CityCard } from "@/components/CardsComponents";
import {
  DashedSeparator,
  HeadingTwo,
  SubHeading,
} from "@/components/MainComponents";
import { ICityCardData } from "@/types/CardsTypes";
export interface Data {
  cards: ICityCardData[];
  title: string;
  sub_title: string;
  color?: string;
}

type PopularPlacesProps = {
  t: TFunction;
  data: Data;
  color?: {
    basic_color: string;
    secondary_color: string;
    temp_color: string;
  };
};
const PopularPlaces = memo(function PopularPlaces({
  data,
  t,
  color,
}: PopularPlacesProps) {
  if (data?.cards?.length < 1) {
    return;
  }

  return (
    <section className="h-auto  bg-grey text-temp_secondary ">
      <section className="relative z-10  pt-10 flex flex-col items-center site_container min-h-[550px]">
        <HeadingTwo color={color}>{data?.title}</HeadingTwo>
        <SubHeading color={color}>{data?.sub_title} </SubHeading>
        <DashedSeparator color={color} />
        <div className="Popular__Places__wrapper w-full flex justify-between items-start  gap-[35px] lg:flex-col lg:items-center my-10">
          <div
            className="Popular__Places__main lg:w-full  3xl:w-[365px] 5xl:w-[440px] 6xl:w-[510px]  w-[40%]
             bg-red- flex flex-col gap-[35px]"
          >
            {data?.cards
              ?.filter((city) => city.type === "main_slider")
              ?.map((city) => (
                <CityCard key={city?.city_id} city={city} t={t} />
              ))}
          </div>

          <div className="Popular__Places--cards lg:w-full  3xl:w-[540px] 5xl:w-[635px] 6xl:w-[755px]  w-[56%] grid-homepage-customized  min-h-[535px]  ">
            {data?.cards
              ?.filter((city) => city.type !== "main_slider")
              ?.map((city) => (
                <CityCard key={city?.city_id} city={city} t={t} />
              ))}
          </div>
        </div>
      </section>
    </section>
  );
});

export default PopularPlaces;
