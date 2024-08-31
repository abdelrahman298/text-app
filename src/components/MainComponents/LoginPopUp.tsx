import { useRef } from "react";
import favIconSrc from "/assets/fav-icon.png";
import favoritesIllustration from "/assets/favorites-illustration.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  showLoginPopUp,
  setShowLoginPopUp,
} from "../../app/Features/AuthenticationSlice.tsx";
import LangLink from "./LangLink.tsx";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";

function LoginPopUp({ t }) {
  const LoginPopUpContent = useRef(null);
  const toggleLoginPopUp = useAppSelector(showLoginPopUp);
  const dispatchRedux = useAppDispatch();

  return (
    <section
      onClick={(e) => {
        if (!LoginPopUpContent.current.contains(e.target)) {
          dispatchRedux(setShowLoginPopUp(false));
        }
      }}
      className={`w-full h-screen ${
        toggleLoginPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex-center">
        <div className="LoginPopUp__absolute absolute h-full w-full bg-black opacity-40"></div>
        <div
          ref={LoginPopUpContent}
          className={`LoginPopUp__content w-1/2 min-w-[750px] md:min-w-[300px] h-1/2 min-h-[420px]  md:w-full rounded-md md:rounded-none flex bg-grey ${
            toggleLoginPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg md:w-full md:h-full md:flex-col md:items-center md:justify-between relative`}
        >
          <div className="w-1/2 md:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 ">
            <img
              className="w-14  aspect-square "
              src={favIconSrc}
              alt="fav-icon"
            />
            <h3 className="text-2xl font-medium text-center ">
              {t("LoginPopUp.heading")}
            </h3>
            <p className=" text-lg   items-center hidden md:flex ">
              {t("LoginPopUp.sub_heading")}
            </p>
            <LangLink
              to="/Login"
              className=" w-full round  h-10  flex-center gap-2 px-2 py-[6px] bg-temp_secondary trns  hover:bg-background hover:text-temp_secondary text-background text-lg mt-5 mb-3 md:max-w-xs"
            >
              {t("LoginPopUp.Login")}
            </LangLink>
            <LangLink
              to="/register"
              className=" w-full rounded-md  h-10  flex-center gap-2 px-2 py-[6px] bg-background trns  hover:bg-temp_secondary hover:text-background text-temp_secondary text-lg md:max-w-xs"
            >
              {t("LoginPopUp.Register")}
            </LangLink>
          </div>
          <div className="w-1/2 md:w-full md:pt-7 md:gap-4 h-auto bg-background flex justify-between px-7 flex-col items-center ">
            <p className=" text-xl font-medium h-[15%] md:h-auto  flex items-center md:hidden">
              {t("LoginPopUp.sub_heading")}
            </p>

            <img
              className="h-[85%] md:h-auto object-cover md:max-w-xs"
              src={favoritesIllustration}
              alt="favoritesIllustration"
            />
          </div>
          <FontAwesomeIcon
            onClick={() => dispatchRedux(setShowLoginPopUp(false))}
            className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl "
            icon={faCircleXmark}
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPopUp;
