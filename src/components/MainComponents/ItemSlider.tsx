import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { ISinglePropertyDetails } from "@/types/CardsTypes";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
register();
interface IItemSliderProps {
  data: ISinglePropertyDetails;
  className?: string;
  fullWidth?: boolean;
}
function ItemSlider({ data, className, fullWidth }: IItemSliderProps) {
  const uniqueID = useId();
  const swiperElRefMain = useRef(null);
  const swiperElRefThumbs = useRef(null);
  const sliders =
    data?.sliders?.length > 0 && data?.primary_image
      ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
      : data?.sliders?.length > 0
      ? [...data?.sliders]
      : [{ id: uniqueID, src: data?.primary_image }];

  useEffect(() => {
    const commonSwiperParams: SwiperOptions = {
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      loop: true,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      zoom: {
        maxRatio: 5,
      },
    };
    const MainSwiperParams: SwiperOptions = {
      ...commonSwiperParams,
      slidesPerView: 1,
      speed: 1500,
      effect: "coverflow",
      coverflowEffect: {
        slideShadows: false,
      },
      thumbs: {
        swiper: swiperElRefThumbs?.current,
      },
    };
    const ThumbsSwiperParams: SwiperOptions = {
      ...commonSwiperParams,
      spaceBetween: 15,
      speed: 500,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      watchSlidesProgress: true,
      breakpoints: {
        300: {
          slidesPerView: sliders.length > 1 ? 2 : sliders.length,
        },
        768: {
          slidesPerView: sliders.length > 2 ? 3 : sliders.length,
        },
        990: {
          slidesPerView: sliders.length > 3 ? 4 : sliders.length,
        },
      },
    };
    Object.assign(swiperElRefMain?.current, MainSwiperParams);
    if (sliders?.length > 1) {
      Object.assign(swiperElRefThumbs?.current, ThumbsSwiperParams);
    }

    if (data) {
      swiperElRefMain?.current?.initialize();
      swiperElRefThumbs?.current?.initialize();
    }
  }, [data, sliders?.length]);

  return (
    <div className={cn(`slider w-full h-auto  bg-`, className)}>
      <div className="ItemSlider__top--slider w-full bg-  min-h-fit lg:w-full mb- px-1.5 relative">
        {sliders?.length > 4 && (
          <button
            onClick={() => {
              swiperElRefMain?.current?.swiper?.slidePrev();
            }}
            className=" absolute !bg-background left-5 top-1/2 -translate-y-1/2 bg- text-temp_secondary  border-2 hover:scale-105 border-temp_secondary flex justify-center items-center rounded trns active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 ss:hidden"
          >
            <FontAwesomeIcon
              className="rotate-180 text-lg font-bold"
              icon={faChevronRight}
            />
          </button>
        )}
        <swiper-container
          //thumbs-swiper=".ItemSlider__thumbs-slider"
          init={false}
          ref={swiperElRefMain}
        >
          {sliders?.map((card) => (
            <swiper-slide key={card?.id}>
              <div
                className={`img-slider-wrapper w-full aspect-[3/2] ${
                  fullWidth
                    ? " max-h-[600px]  h-[600px] lg:max-h-[450px]  lg:h-[450px]"
                    : "  max-h-[450px]  "
                }   overflow-hidden   cursor-pointer `}
              >
                <img
                  className="w-full h-full object-cover  round"
                  src={card?.src}
                  alt={card?.id}
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
        {sliders?.length > 4 && (
          <button
            onClick={() => {
              swiperElRefMain?.current?.swiper?.slideNext();
            }}
            className="swiper-button-next absolute right-5 top-1/2 -translate-y-1/2 bg-temp_secondary text-grey  border-2 border-temp_secondary hover:scale-105 flex justify-center items-center rounded trns active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 ss:hidden"
          >
            <FontAwesomeIcon
              className=" text-lg font-bold"
              icon={faChevronRight}
            />
          </button>
        )}
      </div>

      <div className="ItemSlider__bottom-slider  relative  bg-red- mt-1">
        {sliders?.length > 1 && (
          <swiper-container init={false} ref={swiperElRefThumbs}>
            {sliders?.map((card) => (
              <swiper-slide key={card?.id}>
                <div className="flex-center">
                  <div className="  slide__img--wrapper aspect-[3/2]  w-full max-w-[300px] md:max-w-[350px]   ss:h-auto cursor-pointer opacity-80 my-4 trns border-2 border-transparent p-1  overflow-hidden ">
                    <img
                      className="w-full h-full object-cover "
                      src={card?.src}
                      alt={card?.id}
                    />
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </div>
    </div>
  );
}

export default ItemSlider;
