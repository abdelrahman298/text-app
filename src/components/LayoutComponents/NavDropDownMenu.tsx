import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import favIconSrc from "/assets/fav-icon.png";
import { userData } from "../../app/Features/AuthenticationSlice.tsx";
import { setToggleLogOutPopUp } from "../../app/Features/MiscellaneousSlice.tsx";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LangLink from "../MainComponents/LangLink.tsx";
import { useFetchData } from "@/Hooks/useAxios.tsx";

function NavDropDownMenu() {
  const NavDropDownMenuContent = useRef<HTMLDivElement>(null);
  const { data } = useFetchData(
    "userData",
    import.meta.env.VITE_USER_PROFILE_DATA,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );
  const { t } = useTranslation("LayoutComponents");

  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);

  const [toggleDropDownMenu, setToggleDropDownMenu] = useState(false);

  useEffect(() => {
    function clicked(e) {
      if (!NavDropDownMenuContent?.current?.contains(e.target)) {
        setToggleDropDownMenu(false);
      }
    }
    document.addEventListener("click", clicked);
    return () => {
      document.removeEventListener("click", clicked);
    };
  }, []);

  return (
    <div
      w-full
      h-full
      border-background
      border-2
      rounded-full
      border-dashed
      inset-0
      // absolute
      group-hover:rotate-180
      transition-transform
      ease-out
      duration-1000
      ref={NavDropDownMenuContent}
      onClick={() => setToggleDropDownMenu(!toggleDropDownMenu)}
      className="sigin__wrapper group relative "
    >
      <Avatar className="  group w-14  p-1.5 cursor-pointer">
        <div className="avatar__dashed--wrapper w-full h-full border-background border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
        <AvatarImage
          className="object-cover rounded-full"
          src={data?.src ? data?.src : user?.data?.user_image}
        />
        <AvatarFallback>
          {user?.data?.first_name?.toString().charAt(0)}{" "}
          {user?.data?.last_name?.toString().charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div
        className={`signin__menu absolute w-72 h-96 top-10 right-0 rtl:right-auto rtl:left-0  group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none transition-all duration-300 ease-in-out pt-8 ${
          toggleDropDownMenu ? "pointer-events-auto opacity-100" : ""
        }`}
      >
        <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md rounded-md ">
          <img
            className="w-14  aspect-square"
            src={favIconSrc}
            alt="fav-icon"
          />
          <ul className="flex flex-col gap-7 mt-5 mb-3">
            <li>
              <LangLink
                to="/profile"
                className=" w-full rounded-sm  h-10  flex justify-start items-center gap-2 px-2 py-[6px] bg-temp_secondary transition-all duration-300 ease-in-out  hover:bg-background hover:text-temp_secondary text-background text-lg  "
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className=" text-lg cursor-pointer"
                />
                {t("NavDropDownMenu.menu_items.my_profile.btn_txt")}
              </LangLink>
            </li>
            <li>
              <button
                onClick={() => dispatchRedux(setToggleLogOutPopUp(true))}
                className=" w-full rounded-sm  h-10  flex justify-start items-center gap-2 px-2 py-[6px] bg-temp_secondary transition-all duration-300 ease-in-out  hover:bg-background hover:text-temp_secondary text-background text-lg  "
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className=" text-lg cursor-pointer"
                />
                {t("NavDropDownMenu.menu_items.Log_out.btn_txt")}
              </button>
            </li>
          </ul>
          {/*  <LangLink
            to="/register"
            className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-background transition-all duration-300 ease-in-out  hover:bg-temp_secondary hover:text-background text-temp_secondary text-lg"
          >
            ssssss
          </LangLink> */}
          <p className="opacity-70 text-temp_secondary"> {data?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default NavDropDownMenu;
