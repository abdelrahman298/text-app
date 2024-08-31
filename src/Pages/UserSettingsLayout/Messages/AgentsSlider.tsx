import { cn } from "@/lib/utils";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

register();
type AgentsSliderProps = {
  data: {
    id: number;
    image?: string;
    name: string;
    msg: string;
  }[];
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | number>>;
  selectedChatId: string | number;
  className?: string;
};
function AgentsSlider({
  data,
  className,
  selectedChatId,
  setSelectedChatId,
}: AgentsSliderProps) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,
      spaceBetween: 30,
      centerInsufficientSlides:true,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        370: {
          slidesPerView: 4,
        },
        550: {
          slidesPerView: 5,
        },
        650: {
          slidesPerView: 6,
        },
      },
    };

    Object.assign(swiperElRef?.current, swiperParams);
    if (data) {
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  return (
    <ul className={cn("w-full  px-5", className)}>
      <swiper-container init={false} ref={swiperElRef}>
        {data?.map((card) => (
          <swiper-slide key={card?.id}>
            <li
              onClick={() => setSelectedChatId(card?.id)}
              className={`flex-center group gap-3 trns cursor-pointer w-full h-full  py-3  ${
                selectedChatId === card?.id ? "bg-gray-200" : ""
              } hover:bg-gray-200 rounded-2xl`}
            >
              <Avatar className="   cursor-pointer  w-16 min-w-[64px] h-16 min-h-[64px]  p-1.5 ">
                <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
                <AvatarImage
                  className="object-cover rounded-full"
                  src={card?.image}
                />
                <AvatarFallback>
                  {card?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                  {card?.name?.split(" ")?.[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </li>
          </swiper-slide>
        ))}
      </swiper-container>
    </ul>
  );
}

export default AgentsSlider;
