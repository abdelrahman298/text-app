import { memo } from "react";
import { ICityCardData } from "@/types/CardsTypes";
import { LangLink } from "../MainComponents";
import { TFunction } from "i18next";
type CityCardProps = {
  t: TFunction;
  city: ICityCardData;
};
const CityCard = memo(function CityCard(props: CityCardProps) {
  return (
    <LangLink
      key={props.city?.city_id}
      //! r must be -1 to search in cites and neglect searching in regions in the search page, whereas we check from the last to the first (r => c => cr)
      to={`/search?k=${props.city?.title?.replace(/\s/g, "-")}&fc=1&cr=-1&c=${
        props.city?.id
      }&r=-1&t=&f=&pr=&p=&b=&af=&at=&pf=&pt=&srt=&page=1`}
      //!for width in sm, the card either be for slider or grid (w-full)
      className={`sm:w-full group overflow-hidden round ${
        props.city?.type === "main_slider"
          ? " h-[535px] x:h-[250px] w-full hover:-translate-y-2  max-w-[720px] "
          : "h-[250px] w-full hover:-translate-y-2   "
      } relative  trns shadow-md `}
    >
      <img
        loading="lazy"
        className="w-full h-full object-cover cursor-pointer group-hover:scale-110 trns "
        src={props.city?.image}
        alt={props.city?.title}
      />
      <div className="CityCard__gradient--background absolute inset- bottom-0 w-full h-4/5 bg-gradient-to-t opacity- from-blue-900/70  flex justify-center items-center flex-col gap- z-40 group-hover:translate-y-1 translate-y-5 transition-all duration-300 ease-in-out text-background">
        <h3 title={props?.city?.title} className="text-3xl  font-bold truncate">
          {props?.city?.title}
        </h3>
        <h4 className="rtl:rtl text-2xl ">
          {props?.t("CityCard.total_count_formatted", {
            count: props?.city?.rent_properties + props?.city?.sale_properties,
          })}
        </h4>
        <h3 className="rtl:rtl mt-3">
          {props?.t("CityCard.rent_count_formatted", {
            count: props?.city?.rent_properties,
          })}
        </h3>
        <h3 className="rtl:rtl ">
          {props?.t("CityCard.sale_count_formatted", {
            count: props?.city?.sale_properties,
          })}
        </h3>
      </div>
    </LangLink>
  );
});

export default CityCard;
