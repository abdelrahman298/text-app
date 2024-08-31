import { useFetchParallelData, useExternalData } from "@/Hooks/useAxios";
import { memo, useState } from "react";
import { HeadingUnderline, LangLink } from "../MainComponents";
import { TFunction } from "i18next";
import { defaultData } from "../../../src/Utilities/style.js";

const RecentlyViewedProperties = memo(function RecentlyViewedProperties({
  t,
}: {
  t: TFunction;
}) {
  const { data: externalData } = useExternalData();

  const [recentlyViewedPropertiesArray, setRecentlyViewedPropertiesArray] =
    useState(JSON.parse(sessionStorage.getItem("rvpa")) || []);
  const data = useFetchParallelData(
    "RecentlyViewedProperties",
    recentlyViewedPropertiesArray,
    import.meta.env.VITE_SINGLE_PROPERTY_DETAILS,
    5000,
    0,
    false,
    false,
    recentlyViewedPropertiesArray?.length > 0
    // true
  );
  console.log("data", data);
  console.log("data_single", data?.[0]?.data?.[0]?.id);

  if (recentlyViewedPropertiesArray?.length < 1) {
    return;
  }

  return (
    <section className="w-full px-6">
      <HeadingUnderline
        color={defaultData.color}
        textcolor={defaultData.color}
        className="mb-9"
      >
        {t("RecentlyViewedProperties.title")}
      </HeadingUnderline>

      <div className="RecentlyViewedProperties__slider h-auto w-full overflow-x-hidden flex flex-col gap-5">
        {data?.map((card: any, i: number) => (
          <div
            key={i}
            className=" w-full flex justify-start items-start gap-7 bg- overflow-hidden"
          >
            <LangLink
              to={`/properties/${
                card?.data?.[0]?.listing_number
              }/${card?.data?.[0]?.title?.replace(/\s/g, "-")}`}
              className="w-20 aspect-square min-w-[80px] overflow-hidden  rounded-md border "
            >
              <img
                className="w-20 aspect-square min-w-[80px] object-cover  cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                src={card?.data?.[0]?.primary_image}
                alt={card?.data?.[0]?.title}
                loading="lazy"
              />
            </LangLink>

            <div className="flex justify-between flex-col w-full h-full bg-">
              <div className="w-full text-temp_secondary">
                <LangLink
                  title={card?.data?.[0]?.title}
                  to={`/properties/${
                    card?.data?.[0]?.listing_number
                  }/${card?.data?.[0]?.title?.replace(/\s/g, "-")}`}
                  className="font-medium text-lg leading-none mb-0.5  bg-  rtl:leading-6 line-clamp-1"
                >
                  {card?.data?.[0]?.title}
                </LangLink>
                <p
                  title={card?.data?.[0]?.address}
                  className="opacity-70 bg-red- text-sm line-clamp-1"
                >
                  {card?.data?.[0]?.address}
                </p>
              </div>
              <p
                title={t("PropertyCard.price_formatted", {
                  context: card?.data?.[0]?.for_what,
                  sale_price: card?.data?.[0]?.sale_price,
                  rent_price: card?.data?.[0]?.rent_price,
                  curr: card?.data?.[0]?.currency,
                  duration: card?.data?.[0]?.rent_duration,
                })}
                className="bg-temp_secondary text-background flex justify-center items-center w-fit  py-1.5 rounded-sm px-2 text-xs truncate"
              >
                {t("PropertyCard.price_formatted", {
                  context: card?.data?.[0]?.for_what,
                  sale_price: card?.data?.[0]?.sale_price,
                  rent_price: card?.data?.[0]?.rent_price,
                  curr: card?.data?.[0]?.currency,
                  duration: card?.data?.[0]?.rent_duration,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
export default RecentlyViewedProperties;
