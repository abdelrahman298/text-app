import { memo, useEffect, useRef } from "react";

import {
  DashedSeparator,
  HeadingTwo,
  SubHeading,
} from "@/components/MainComponents";
import { IAgentCardData } from "@/types/CardsTypes";
import { AgentCard } from "@/components/CardsComponents";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
import { TFunction } from "i18next";
register();

interface IOurAgentsProps {
  data: {
    cards: IAgentCardData[];
    title: string;
    sub_title: string;
  };
  t: TFunction;
  color?: {
    basic_color?: string;
    secondary_color?: string;
  };
}

const OurAgents = memo(function OurAgents({ data, t, color }: IOurAgentsProps) {
  const swiperElRef = useRef(null);

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
        650: {
          slidesPerView: 2,
        },
        990: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    };
    if (data?.cards?.length > 0) {
      Object.assign(swiperElRef?.current, swiperParams);
    }
    if (data) {
      swiperElRef?.current?.initialize();
    }
  }, [data]);
  if (data?.cards?.length < 1) {
    return;
  }
  console.log("FROM OUT AGENTS " + JSON.stringify(data));

  return (
    <section className="h-auto w-full bg-grey pt-10 pb-32">
      <section className="    flex flex-col items-center site_container min-h-[550px] ">
        <HeadingTwo color={color}>{data?.title}</HeadingTwo>
        <SubHeading color={color}>{data?.sub_title} </SubHeading>
        <DashedSeparator color={color} />
        <div className="OurAgents__Slider h-auto w-full  my-10  ">
          <swiper-container init={false} ref={swiperElRef}>
            {data?.cards?.map((card) => (
              <swiper-slide key={card?.id}>
                <AgentCard
                  className={
                    data?.cards?.length > 4 ? "max-w-[410px] w-full " : "w-full"
                  }
                  key={card?.id}
                  card={card}
                  t={t}
                  slider
                  color={color}
                />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </section>
    </section>
  );
});

export default OurAgents;
