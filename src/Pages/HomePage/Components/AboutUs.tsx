import { useExternalData } from "@/Hooks/useAxios";
import { setShowVideoPopUp } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { HeadingTwo, VideoPopUp } from "@/components/MainComponents";
import {
  faBuildingShield,
  faBuildingWheat,
  faHouseSignal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { defaultData } from "../../../Utilities/style.js";

interface AboutUsProps {
  data: {
    image: string;
    video_link: string;
    base_title: string;
    title: string;
    description: string;
    first_section: string;
    second_section: string;
    third_section: string;
  };
}
const AboutUs = memo(function AboutUs({ data }: AboutUsProps) {
  const dispatchRedux = useAppDispatch();
  const { data: externalData } = useExternalData();

  return (
    <>
      <VideoPopUp video_type={"youtube"} VideoSrc={data?.video_link} />

      <section className=" site_container  py-20 flex lg:flex-col gap-10 items-center  min-h-[550px] ">
        <div className="w-3/5 min-h-[500px] lg:min-h-fit  flex flex-col justify-center lg:items-center gap-3   lg:w-full ">
          <h3
            style={{ color: defaultData.color.basic_color }}
            className="  font-bold text-accnt  w-fit mb-1 text-xl uppercase lg:text-center"
          >
            {data?.base_title}
          </h3>
          <HeadingTwo
            color={defaultData.color && defaultData.color}
            colored={false}
            className={"text-start   lg:text-center"}
          >
            {data?.title}
          </HeadingTwo>

          <p
            style={{
              color:
                defaultData.color.basic_color && defaultData.color.basic_color,
            }}
            className="mt-3 mb-1 text-temp_secondary text-justify opacity-80 border-b border-b- border-op border-dashed pb-3 lg:text-center"
          >
            {data?.description}
          </p>
          <div
            style={{
              color:
                defaultData.color.basic_color && defaultData.color.basic_color,
            }}
            className="aboutUs__bottom--data w-full  flex justify-between items-center gap-3 text-base sm:flex-col sm:w-fit  sm:items-start text-temp_secondary"
          >
            <span className="flex items-center gap-2 ">
              <FontAwesomeIcon
                className="text-temp_secondary"
                icon={faHouseSignal}
              />
              {data?.first_section}
            </span>
            <span className="flex items-center gap-2 ">
              <FontAwesomeIcon
                className="text-temp_secondary"
                icon={faBuildingWheat}
              />
              {data?.second_section}
            </span>
            <span className="flex items-center gap-2 ">
              <FontAwesomeIcon
                className="text-temp_secondary"
                icon={faBuildingShield}
              />
              {data?.third_section}
            </span>
          </div>
        </div>

        <div className="w-2/5 aspect-square lg:aspect-video p-5 shadow-lg lg:w-full  rounded-sm lg:rounded-[64px]">
          <div
            style={{
              backgroundImage: `url('${data?.image}'), linear-gradient(rgba(9, 82, 158,0.2),rgba(9, 82, 158,0.5))`,
            }}
            className={`w-full  h-full    bg-fixed bg-no-repeat  bg-center bg-cover bg-blend-overlay    shadow-2xl shadow-temp_secondary/40  rounded-sm lg:rounded-[44px] flex-center`}
          >
            <button
              onClick={() => {
                dispatchRedux(setShowVideoPopUp(true));
              }}
            >
              <svg
                version="1.1"
                id="play__btn"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                height="100px"
                width="100px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 100 100"
                xmlSpace="preserve"
              >
                <path
                  className="play__btn--stroke stroke-background"
                  fill="none"
                  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
    C97.3,23.7,75.7,2.3,49.9,2.5"
                />
                <path
                  className="play__btn--stroke--icon fill-background"
                  d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
});

export default AboutUs;
