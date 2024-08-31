import { useEffect, useRef } from "react";
import { CategoryCard } from "../CardsComponents";
import { TFunction } from "i18next";
import { ICategoryCard } from "@/types/CardsTypes";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { DashedSeparator, HeadingTwo, SubHeading } from "../MainComponents";
import { useExternalData } from "@/Hooks/useAxios";
import { defaultData } from "../../../src/Utilities/style.js";

register();
interface ICategoriesSliderProps {
  data: { title: string; sub_title: string; cards: ICategoryCard[][] };
  t: TFunction;
}

function CategoriesSlider({ data, t }: ICategoriesSliderProps) {
  const swiperElRef = useRef(null);
  const { data: externalData } = useExternalData();

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      centerInsufficientSlides: true,
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
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 2,
        },
        990: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
      },
    };
    if (data?.cards?.[0]?.length > 0) {
      Object.assign(swiperElRef?.current, swiperParams);
    }
    if (data?.cards?.[0]) {
      swiperElRef?.current?.initialize();
    }
  }, [data?.cards]);

  if (data?.cards?.[0]?.length < 1) {
    return;
  }

  return (
    <section className={`h0  site_container pb- pt-16  `}>
      <HeadingTwo color={defaultData.color && defaultData.color}>
        {data?.title}
      </HeadingTwo>
      <SubHeading color={defaultData.color && defaultData.color}>
        {data?.sub_title}{" "}
      </SubHeading>
      <DashedSeparator color={defaultData.color && defaultData.color} />
      <div className="CategoriesSlider h-auto w-full  my-10">
        <swiper-container init={false} ref={swiperElRef}>
          {data?.cards?.[0]?.map((card) => (
            <swiper-slide key={card?.id}>
              <CategoryCard key={card?.id} card={card} t={t} slider />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
}

export default CategoriesSlider;
