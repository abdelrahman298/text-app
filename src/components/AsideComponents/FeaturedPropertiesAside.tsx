import { useFetchPaginatedData, useExternalData } from "@/Hooks/useAxios";
import { memo, useEffect, useRef } from "react";
import { PropertyCard } from "../CardsComponents";
import { IPropertyCardData } from "@/types/CardsTypes";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { TFunction } from "i18next";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { HeadingUnderline } from "../MainComponents";
import { defaultData } from "../../../src/Utilities/style.js";

// Register Swiper elements
register();

//Create FeaturedPropertiesAside fx component
const FeaturedPropertiesAside = memo(function FeaturedPropertiesAside({
  t,
}: {
  t: TFunction;
}) {
  const { data } = useFetchPaginatedData(
    "FeaturedPropertiesAside",
    "",
    `${import.meta.env.VITE_ALL_PROPERTIES}featured?limit=9`
  );
  const { data: externalData } = useExternalData();
  const user = useAppSelector(userData);
  const dispatchRedux = useAppDispatch();
  const swiperElRef = useRef(null);

  // to initialize a Swiper component if The data prop exists and contains at least one item.
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      loop: true,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      pagination: {
        dynamicBullets: true,
        enabled: true,
        clickable: true,
      },
    };

    if (data && data?.data?.length > 0) {
      Object.assign(swiperElRef?.current, swiperParams);
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  // if the data is not exist or less than 1 item  stop the function's execution
  if (data?.data?.length < 1) {
    return;
  }

  return (
    <section className="w-full px-6">
      <HeadingUnderline textcolor={defaultData.color} className="mb-9">
        {t("FeaturedPropertiesAside.title")}
      </HeadingUnderline>
      <div className="FeaturedPropertiesAside__slider h-auto w-full overflow-x-hidden ">
        <swiper-container init={false} ref={swiperElRef}>
          {data?.data?.map((card: IPropertyCardData) => (
            <swiper-slide key={card?.id}>
              <PropertyCard
                key={card?.id}
                card={card}
                user={user}
                withBullet
                featuredCard
                border
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                t={t}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
});
export default FeaturedPropertiesAside;
