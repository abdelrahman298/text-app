import { memo, useEffect, useRef } from "react";
import {
  DashedSeparator,
  HeadingTwo,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import { ITestimonialCardData } from "@/types/CardsTypes";
import { register } from "swiper/element/bundle";
import { TestimonialCard } from "@/components/CardsComponents";
import { SwiperOptions } from "swiper/types";
import { TFunction } from "i18next";
register();

interface ITestimonialsProps {
  t: TFunction;
  data: {
    title: string;
    sub_title: string;
    testimonials_banner: {
      main: string;
      sub: string;
    };
    cards: ITestimonialCardData[][];
  };
  color?: {
    basic_color: string;
    secondary_color: string;
  };
}

const Testimonials = memo(function Testimonials({
  data,
  t,
  color,
}: ITestimonialsProps) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,
      spaceBetween: 0,
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
        768: {
          slidesPerView: 2,
        },
      },
    };

    Object.assign(swiperElRef?.current, swiperParams);
    if (data) {
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  return (
    <section className="h-auto w-full  pt-40  relative ">
      <div
        style={{ backgroundColor: color?.secondary_color }}
        className="absolute__banner rounded-md absolute site_container h-44 lg:h-auto lg:min-h-[208px] top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-temp_secondary flex lg:flex-col lg:justify-center items-center gap-5  text-background py-5 px-10 ss:px-5"
      >
        <div className="absolute__banner--text w-4/6 lg:w-full h-full lg:h-fit  flex flex-col gap-2 justify-center items-start lg:items-center ">
          <h3
            style={{ color: color?.basic_color }}
            className="text-5xl xl:text-4xl font-bold sm:text-center line-clamp-2 rtl:py-1 rtl:text-4xl"
          >
            {data?.testimonials_banner?.main}
          </h3>
          <h4
            style={{ color: color?.basic_color }}
            className="sm:text-center line-clamp-2"
          >
            {data?.testimonials_banner?.sub}{" "}
          </h4>
        </div>
        <div className="absolute__banner--CTA w-2/6 lg:w-full h-full lg:h-fit flex justify-end items-center lg:justify-center">
          <LangLink
            className="!w-fit !bg-background group custom__btn__accent "
            to="/search"
            id="custom__btn"
          >
            <span
              style={{ color: color?.basic_color }}
              className="text-temp_secondary group-hover:!text-background"
            >
              {t("Testimonials.top_banner.main_CTA")}
            </span>
          </LangLink>
        </div>
      </div>
      <section
        className={`  flex-col items-center site_container min-h-[550px] ${
          data?.cards?.[0]?.length < 1 ? "hidden" : "flex"
        }`}
      >
        <HeadingTwo color={color}>{data?.title}</HeadingTwo>
        <SubHeading color={color}>{data?.sub_title} </SubHeading>
        <DashedSeparator color={color} />
        <div className="Testimonials__Slider h-auto w-full  my-10  ">
          <swiper-container init={false} ref={swiperElRef}>
            {data?.cards?.[0]?.map((card) => (
              <swiper-slide key={card?.id}>
                <TestimonialCard
                  color={color}
                  key={card?.id}
                  card={card}
                  slider
                />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </section>
    </section>
  );
});

export default Testimonials;
