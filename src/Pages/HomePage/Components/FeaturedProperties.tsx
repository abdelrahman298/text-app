import { useEffect, useRef } from "react";

import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice.js";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.js";
import {
  AdContainer,
  DashedSeparator,
  HeadingTwo,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import { PropertyCard } from "@/components/CardsComponents";
import { IPropertyCardData } from "@/types/CardsTypes";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { TFunction } from "i18next";
register();

interface IFeaturedPropertiesProps {
  t: TFunction;
  data: {
    cards: IPropertyCardData[][];
    title: string;
    sub_title: string;
  };
  ads: { image: string; title: string; sub_title: string; link: string }[];
  color?: {
    basic_color: string | any;
    secondary_color: string | any;
  };
}

function FeaturedProperties({ data, ads, t, color }: IFeaturedPropertiesProps) {
  const user = useAppSelector(userData);
  const dispatchRedux = useAppDispatch();
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
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
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      loop: true,
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    };

    Object.assign(swiperElRef?.current, swiperParams);
    if (data) {
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  if (data?.cards?.[0]?.length < 1) {
    return;
  }

  return (
    <section
      className={`h-auto bg-  site_container pt-20  ${
        ads?.[0]
          ? "min-h-[1200px] lg:min-h-[700px]"
          : "min-h-[900px] lg:min-h-[300px]"
      }  bg-`}
    >
      <HeadingTwo color={color}>{data?.title}</HeadingTwo>
      <SubHeading color={color}>{data?.sub_title} </SubHeading>

      <DashedSeparator color={color} />
      <div className="featured__slider h-auto w-full overflow-x-hidden  mt-10">
        <swiper-container init={false} ref={swiperElRef}>
          {data?.cards?.[0]?.map((card) => (
            <swiper-slide key={card?.id}>
              <PropertyCard
                key={card?.id}
                card={card}
                user={user}
                slider
                featuredCard
                ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                t={t}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <LangLink
        color={color}
        className="!w-fit mx-auto custom__btn__accent mt-4"
        to="/properties"
        id="custom__btn"
      >
        <span>{t("FeaturedProperties.main_CTA")}</span>
      </LangLink>
      {ads?.[0] && (
        <AdContainer
          src={ads?.[0]?.image}
          alt={ads?.[0]?.image}
          title={ads?.[0]?.title}
          sub_title={ads?.[0]?.sub_title}
          link={ads?.[0]?.link}
          alignment="horizontal"
          className="mt-10"
        />
      )}
    </section>
  );
}

export default FeaturedProperties;
