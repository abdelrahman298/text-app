import {
  faChevronRight,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
register();

interface LightBoxProps {
  data: { id: number; src: string }[];
}
function LightBox({ data }: LightBoxProps) {
  const [index, setIndex] = useState(-1);
  const swiperElRef = useRef(null);
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,

      effect: "coverflow",
      coverflowEffect: {
        slideShadows: false,
      },

      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: false,
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

      zoom: {
        maxRatio: 5,
      },

      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        650: {
          slidesPerView: data?.length > 1 ? 2 : data?.length,
        },
      },
    };
    // Assign it to swiper element
    Object.assign(swiperElRef?.current, swiperParams);
    if (data) {
      // initialize swiper, if the data comes from the server and not static, we need to make this check, otherwise swipper wont work automatically until you interact with it
      swiperElRef?.current?.initialize();
    }

    swiperElRef?.current?.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      // setSwiperProgress(progress);
      //console.log(progress);
    });
    // swiperElRef?.current?.addEventListener("swiperslidechange", (e) => {
    //   //console.log("slide changed");
    // });
  }, [data]);

  return (
    <section
      className={`flex  ${
        data?.length > 3 ? "justify-between" : "justify-center"
      } items-center  relative`}
    >
      {data?.length > 3 && (
        <button
          onClick={() => {
            swiperElRef?.current?.swiper?.slidePrev();
          }}
          className="absolute !bg-background left-5 top-1/2 -translate-y-1/2 bg- text-temp_secondary  border-2 hover:scale-105 border-temp_secondary flex justify-center items-center rounded trns active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 ss:hidden"
        >
          <FontAwesomeIcon
            className="rotate-180 text-lg font-bold"
            icon={faChevronRight}
          />
        </button>
      )}
      <div className="w-full">
        <swiper-container init={false} ref={swiperElRef}>
          {data?.map((slide, index: number) => (
            <swiper-slide key={slide?.id}>
              <div
                key={slide.id}
                className={`img__wrapper min-h-[330px] aspect-[3/2] overflow-hidden round relative  group ${
                  data?.length < 3 ? "max-w-[410px]" : "w-full"
                }`}
              >
                <img
                  className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
                  src={slide?.src}
                  alt={slide?.src}
                />
                <button
                  onClick={() => setIndex(index)}
                  className="slide__hover_eye absolute inset-0 w-full h-full bg-blue-800/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-4xl text-accent/50"
                    icon={faMagnifyingGlassPlus}
                  />
                </button>
              </div>{" "}
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      {data?.length > 3 && (
        <button
          onClick={() => {
            swiperElRef?.current?.swiper?.slideNext();
          }}
          className="swiper-button-next absolute right-5 top-1/2 -translate-y-1/2 bg-temp_secondary text-grey  border-2 border-temp_secondary hover:scale-105 flex justify-center items-center rounded trns active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 ss:hidden"
        >
          <FontAwesomeIcon
            className=" text-lg font-bold"
            icon={faChevronRight}
          />
        </button>
      )}
      <Lightbox
        slides={data}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </section>
  );
}

export default LightBox;
