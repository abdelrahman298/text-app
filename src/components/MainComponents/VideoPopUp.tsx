import React, { useRef } from "react";
import ReactPlayer from "react-player/lazy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import {
  setShowVideoPopUp,
  showVideoPopUp,
} from "@/app/Features/MiscellaneousSlice";

function VideoPopUp({
  // video_type,
  VideoSrc,
}: {
  video_type?: string;
  VideoSrc: string;
}) {
  const VideoPopUpContent = useRef<HTMLDivElement>(null);
  const toggleVideoPopUp = useAppSelector(showVideoPopUp);
  /*   const src = useSelector(VideoSrc);
   */ const dispatchRedux = useAppDispatch();
  console.log(`${VideoSrc?.substring(32)}`);
  return (
    <section
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (!VideoPopUpContent?.current?.contains(e.target as Node)) {
          dispatchRedux(setShowVideoPopUp(false));
          /*           dispatchRedux(setVideoSrc(""));
           */
        }
      }}
      className={`w-full h-screen ${
        toggleVideoPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="VideoPopUp__absolute absolute h-full w-full bg-black/40 "></div>
        <FontAwesomeIcon
          onClick={() => dispatchRedux(setShowVideoPopUp(false))}
          className="absolute top-10 right-10 text-5xl cursor-pointer text-background"
          icon={faCircleXmark}
        />
        <div
          ref={VideoPopUpContent}
          className={`VideoPopUp__content iframe-wrapper aspect-video  w-9/12 md:w-11/12 overflow-hidden rounded-xl border-2 border-temp_secondary shadow-2xl ${
            toggleVideoPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-2xl `}
        >
          <ReactPlayer
            controls
            width="101%"
            height="101%"
            stopOnUnmount={true}
            playing={toggleVideoPopUp}
            url={VideoSrc}
            playsinline={true}
          />
        </div>
      </div>
    </section>
  );
}

export default VideoPopUp;
