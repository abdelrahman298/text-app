import { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faChevronDown,
  faHouseMedical,
  faUser,
  faXmark,
  faArrowRightFromBracket,
  faCommentDots,
  faCommentDollar,
  faHeartCircleCheck,
  faHouseUser,
  faMessage,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";
import {
  setShowLoginPopUp,
  userData,
  Id,
} from "../../app/Features/AuthenticationSlice.tsx";
import { useFetchData, useExternalData } from "../../Hooks/useAxios.tsx";
import { useTranslation } from "react-i18next";
import {
  currentUserMenuTab,
  lang,
  setToggleLogOutPopUp,
  setCurrentUserMenuTab as setCurrTab,
} from "../../app/Features/MiscellaneousSlice.tsx";
import { LangLink, LangNavLink } from "../MainComponents/index.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultData } from "../../../src/Utilities/style.js";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import useHandleLogOut from "@/Utilities/useHandleLogOut.tsx";
function Navbar() {
  const { data: externalData } = useExternalData();

  const { pathname } = useLocation();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 96) {
        setScroll(true);
      } else setScroll(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const dispatchRedux = useAppDispatch();
  const navigate = useNavigate();
  const lng = useAppSelector(lang);
  const currTab = useAppSelector(currentUserMenuTab);
  const [toggleMobNav, setToggleMobNav] = useState(false);
  const [toggleUserInfoNav, setToggleUserInfoNav] = useState(false);
  const { t, i18n } = useTranslation("LayoutComponents");
  const user = useAppSelector(userData);
  const userID = useAppSelector(Id);
  const [logOut] = useHandleLogOut();

  const { data: userInfoData, error } = useFetchData(
    "userData",
    `${import.meta.env.VITE_USER_PROFILE_DATA}/${
      import.meta.env.VITE_SINGLE_USER_DETAILS
    }${userID}`,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!user?.token,
    true
  );
  // ! prevent the logout from invoke despite of the status 401
  // useEffect(() => {
  //   if (error?.response?.status === 401) {
  //     logOut();
  //   }
  // }, [error, logOut]);

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    window.location.replace(window.location.href.replace(lng, lang));
  }
  const activeLink = ({ isActive }: { isActive: boolean }) => ({
    opacity: isActive ? "100%" : "80%",
    backgroundSize:
      scroll && isActive ? "95% 3px" : isActive ? "95% 3px" : "0% 3px",
    backgroundRepeat: isActive ? "no-repeat" : "",
    backgroundPosition: isActive ? "center bottom" : "",
    paddingBottom: isActive ? "2px" : "",
    transition: "all 300ms ease",
    color: scroll
      ? defaultData.color.basic_color
        ? defaultData.color.basic_color
        : "rgba(9, 82, 158,1"
      : pathname === `/${lng}`
      ? "white"
      : defaultData.color.basic_color
      ? defaultData.color.basic_color
      : "rgba(9, 82, 158,1",
    borderWidth: isActive && "0 0 2px 0",
    borderStyle: isActive && "solid",
    borderColor: isActive ? defaultData.color.basic_color : "",
  });

  const mobActiveLink = ({ isActive }: { isActive: boolean }) => ({
    background:
      "linear-gradient(94deg, rgba(255, 255, 255,1) 0%, rgba(255, 255, 255,1) 100%)",

    opacity: isActive ? "100%" : "80%",
    backgroundSize: isActive ? "95% 3px" : "0% 3px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left bottom",
    paddingBottom: "2px",
    transition: "all 300ms ease",
  });

  // console.log("navbar data " + userInfoData?.first_name);
  console.log(userID);

  return (
    <header
      className={`w-full h-24 trns ${
        scroll ? "bg-background shadow-md" : "bg-transparent "
      }   shadow- border-b-[0.01px] border-b-background z-50 fixed inset-0`}
    >
      <nav className=" h-full site_container bg- flex justify-between items-center    z-50">
        <LangLink to="/">
          <img
            className="logo  w-24 max-w-[96px] min-w-[150px] axs:w-20 axs:max-w-[80px] axs:min-w-[80px]"
            src={
              scroll
                ? defaultData?.colored_logo
                : pathname === `/${lng}`
                ? defaultData?.white_logo
                : defaultData?.colored_logo
            }
            alt="logo"
          />
        </LangLink>
        <ul className="desktop__nav 3xl:hidden flex justify-between items-center text- text-lg gap-7 5xl:text-base 5xl:gap-4 bg-">
          <li>
            <LangNavLink
              style={activeLink}
              className={`desktop__nav--item `}
              homepage
              end
              to={`/${lng}`}
            >
              {t("Navbar.menu_items.Home")}
            </LangNavLink>
          </li>
          <li className="  relative h-24 flex-center group/grand cursor-pointer">
            <LangNavLink
              style={activeLink}
              className="desktop__nav--item group/parent h-fit flex justify-start items-center gap-2 "
              to={`/search`}
            >
              {t("Navbar.menu_items.Find_Properties.title")}
              <FontAwesomeIcon
                className={`transition-transform text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180`}
                icon={faChevronDown}
              />
            </LangNavLink>
            <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-temp_secondary text-background top-24 w-[215px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto trns">
              <div
                // style={{ backgroundColor: defaultData.color }}
                className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-background hover:text-temp_secondary trns group/sale cursor-pointer relative"
              >
                {t("Navbar.menu_items.Find_Properties.For_Sale.title")}
                <FontAwesomeIcon
                  className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                  icon={faChevronDown}
                />
                <div className="for__sale--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100  group-hover/sale:pointer-events-auto">
                  <LangLink
                    to={`/search?roc=1&rocsr=1`}
                    className=" w-full bg-temp_secondary h-10 flex justify-between items-center px-2 trns hover:bg-background hover:text-temp_secondary  text-background"
                  >
                    {t(
                      "Navbar.menu_items.Find_Properties.For_Sale.Residential"
                    )}
                  </LangLink>
                  <LangLink
                    to={`/search?roc=2&rocsr=1`}
                    className=" w-full bg-temp_secondary h-10 flex justify-between items-center px-2 hover:bg-background trns hover:text-temp_secondary text-background"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
                  </LangLink>
                </div>
              </div>
              <div className="sub__menu--for--rent w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-background hover:text-temp_secondary trns group/rent cursor-pointer relative">
                {t("Navbar.menu_items.Find_Properties.For_Rent.title")}
                <FontAwesomeIcon
                  className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                  icon={faChevronDown}
                />
                <div className="for__rent--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/rent:opacity-100 group-hover/rent:pointer-events-auto">
                  <LangLink
                    to={`/search?roc=1&rocsr=2`}
                    className=" w-full bg-temp_secondary h-10 flex justify-between items-center px-2 trns hover:bg-background hover:text-temp_secondary text-background"
                  >
                    {t(
                      "Navbar.menu_items.Find_Properties.For_Rent.Residential"
                    )}
                  </LangLink>
                  <LangLink
                    to={`/search?roc=2&rocsr=2`}
                    className=" w-full bg-temp_secondary h-10 flex justify-between items-center px-2 hover:bg-background trns hover:text-temp_secondary text-background"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Rent.Commercial")}
                  </LangLink>
                </div>
              </div>
            </div>
          </li>
          <li>
            <LangNavLink
              style={activeLink}
              className="desktop__nav--item"
              to="/agents"
            >
              {t("Navbar.menu_items.our_agents")}
            </LangNavLink>
          </li>
          <li>
            <LangNavLink
              style={activeLink}
              className="desktop__nav--item"
              to="/projects"
            >
              {t("Navbar.menu_items.Projects")}
            </LangNavLink>
          </li>
          <li>
            <LangNavLink
              style={activeLink}
              className="desktop__nav--item"
              to="/news"
            >
              {t("Navbar.menu_items.news")}
            </LangNavLink>
          </li>
          <li>
            <LangNavLink
              style={activeLink}
              className="desktop__nav--item"
              to="/contact-us"
            >
              {t("Navbar.menu_items.Contact_Us")}
            </LangNavLink>
          </li>
          <li>
            {i18n.language?.startsWith("ar") === true ? (
              <button
                style={{
                  color:
                    scroll && defaultData.color
                      ? defaultData.color
                      : pathname === `/${lng}`
                      ? "white"
                      : defaultData.color
                      ? defaultData.color
                      : "rgba(9, 82, 158,1)",
                }}
                className={
                  scroll
                    ? "text-temp_secondary opacity-80"
                    : pathname === `/${lng}`
                    ? "text-background opacity-80"
                    : "text-temp_secondary opacity-80"
                }
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
            ) : (
              <button
                style={{
                  color:
                    scroll && defaultData.color
                      ? defaultData.color
                      : pathname === `/${lng}`
                      ? "white"
                      : defaultData.color
                      ? defaultData.color
                      : "rgba(9, 82, 158,1)",
                }}
                className={`${
                  scroll
                    ? "text-temp_secondary opacity-80"
                    : pathname === `/${lng}`
                    ? "text-background opacity-80"
                    : "text-temp_secondary opacity-80"
                }`}
                onClick={() => changeLanguage("ar")}
              >
                العربية
              </button>
            )}
          </li>
        </ul>
        {/* //!-- Mobile Nav --*/}
        <Sheet open={toggleMobNav} onOpenChange={setToggleMobNav}>
          <SheetTrigger asChild className="hidden  3xl:block cursor-pointer ">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className={`text-2xl trns hover:scale-110 active:scale-90 ${
                scroll
                  ? "text-temp_secondary 0"
                  : pathname === `/${lng}`
                  ? "text-background 0"
                  : "text-temp_secondary 0"
              }`}
            />
          </SheetTrigger>
          <SheetContent
            className="!w-[100vw]  h-full border-temp_primary bg-temp_secondary  p-0 opacity-0 pointer-events-none  3xl:opacity-100 3xl:pointer-events-auto"
            side="bottom"
          >
            <SheetClose className="outline-none bg-background w-16 aspect-square absolute left-0 rtl:left-auto rtl:right-0 -top-[1px] rounded-br-full cursor-pointer trns hover:w-20 rtl:rounded-br-none rtl:rounded-bl-full ">
              <FontAwesomeIcon
                icon={faXmark}
                className="mr-3 rtl:mr-0 rtl:ml-3 mb-1 text-2xl text-temp_secondary"
              />
              <span className="sr-only">Close Menu</span>
            </SheetClose>
            <ul className="mobile__nav--items  flex flex-col justify-center items-center text-background text-lg gap-9  h-full">
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  homepage
                  end
                  to={`/${lng}`}
                >
                  {t("Navbar.menu_items.Home")}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  to={`/search`}
                >
                  {t("Navbar.menu_items.Find_Properties.title")}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  to="/agents"
                >
                  {t("Navbar.menu_items.our_agents")}{" "}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  to="/projects"
                >
                  {t("Navbar.menu_items.Projects")}{" "}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  to="/news"
                >
                  {t("Navbar.menu_items.news")}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                <LangNavLink
                  style={mobActiveLink}
                  className="mobile__nav--item"
                  to="/contact-us"
                >
                  {t("Navbar.menu_items.Contact_Us")}
                </LangNavLink>
              </li>
              <li onClick={() => setToggleMobNav(false)}>
                {i18n.language?.startsWith("ar") === true ? (
                  <button
                    className=" opacity-80 trns hover:opacity-100"
                    onClick={() => changeLanguage("en")}
                  >
                    English
                  </button>
                ) : (
                  <button
                    className=" opacity-80 trns hover:opacity-100"
                    onClick={() => changeLanguage("ar")}
                  >
                    العربية
                  </button>
                )}
              </li>
            </ul>
          </SheetContent>
        </Sheet>
        <div className="nav__CTAs flex items-center gap-5">
          {user?.token ? (
            <Sheet open={toggleUserInfoNav} onOpenChange={setToggleUserInfoNav}>
              <SheetTrigger className="  cursor-pointer ">
                <Avatar className="  group w-14  p-1.5 ">
                  <div className="avatar__dashed--wrapper w-full h-full border-background border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
                  <AvatarImage
                    className="object-cover rounded-full"
                    src={userInfoData?.image}
                  />
                  <AvatarFallback>
                    {userInfoData?.first_name?.charAt(0)}{" "}
                    {userInfoData?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent
                className="w-96 ss:w-3/4 bg-background flex-col-center "
                side={lng === "ar" ? "right" : "left"}
              >
                <Avatar className="  group w-28 md:w-20  p-1.5 cursor-pointer">
                  <div className="avatar__dashed--wrapper w-full h-full border-background border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
                  <AvatarImage
                    className="object-cover rounded-full"
                    src={userInfoData?.image}
                  />

                  <AvatarFallback>
                    {userInfoData?.first_name?.charAt(0)}{" "}
                    {userInfoData?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-temp_secondary">
                  {userInfoData?.first_name + " " + userInfoData?.last_name}
                </p>
                <p className="opacity-70 text-temp_secondary -my-3">
                  {userInfoData?.email}
                </p>
                <ul className="user__settings--menu--items flex w-full flex-col bg-grey     overflow-hidden my-5">
                  <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("profile"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "profile" ||
                        pathname?.includes("profile")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/profile`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon className="text-" icon={faUserGear} />
                      <span className=" ">
                        {t("Navbar.user_menu_items.profile")}
                      </span>
                    </LangLink>
                  </li>
                  <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("messages"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "messages" ||
                        pathname?.includes("messages")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/messages`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon className="text-" icon={faMessage} />
                      <span className=" ">
                        {t("Navbar.user_menu_items.messages")}
                      </span>
                    </LangLink>
                  </li>
                  <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("reviews"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "reviews" ||
                        pathname?.includes("reviews")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/reviews`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon className="text-" icon={faCommentDots} />
                      <span className=" ">
                        {t("Navbar.user_menu_items.reviews")}
                      </span>
                    </LangLink>
                  </li>

                  {/* //! disable submit property and my properties */}
                  {/* <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("submit_property"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "submit_property" ||
                        pathname?.includes("submit-property")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/submit-property`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon
                        className="text-"
                        icon={faHouseMedical}
                      />
                      <span className=" ">
                        {t("Navbar.user_menu_items.submit_property")}
                      </span>
                    </LangLink>
                  </li> */}
                  {/* <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("my_properties"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "my_properties" ||
                        pathname?.includes("my-properties")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/my-properties`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon className="text-" icon={faHouseUser} />
                      <span className=" ">
                        {t("Navbar.user_menu_items.my_properties")}
                      </span>
                    </LangLink>
                  </li> */}
                  <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("my_offers"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "my_offers" ||
                        pathname?.includes("my-offers")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/my-offers`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon
                        className="text-"
                        icon={faCommentDollar}
                      />
                      <span className=" truncate">
                        {t("Navbar.user_menu_items.my_offers")}
                      </span>
                    </LangLink>
                  </li>
                  <li
                    onClick={() => {
                      dispatchRedux(setCurrTab("favorites"));
                      setToggleUserInfoNav(false);
                    }}
                    className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-y-2 border-y-background  ${
                      (currTab === "favorites" ||
                        pathname?.includes("my-favorites")) &&
                      "active   "
                    }`}
                  >
                    <LangLink
                      to={`/my-favorites`}
                      className="flex gap-2 items-center h-full text-lg "
                    >
                      <FontAwesomeIcon
                        className="text-"
                        icon={faHeartCircleCheck}
                      />
                      <span className=" ">
                        {t("Navbar.user_menu_items.favorites")}
                      </span>
                    </LangLink>
                  </li>
                </ul>
                <li
                  className={`user__settings--menu--item w-full px-4 h-14 md:h-12  border-t-2 border-t-background  list-none bg-grey`}
                >
                  <button
                    onClick={() => {
                      dispatchRedux(setToggleLogOutPopUp(true));
                    }}
                    className="flex gap-2 items-center h-full text-lg w-full"
                  >
                    <FontAwesomeIcon
                      className="text-"
                      icon={faArrowRightFromBracket}
                    />
                    <span className=" ">
                      {t("Navbar.user_menu_items.log_out")}
                    </span>
                  </button>
                </li>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <LangLink
                to="/login"
                className={`login__btn  flex-center  gap-1   trns hover:text-tem_secondary hover:opacity-100  opacity-80 text-base font-medium group sm:hidden ${
                  scroll
                    ? "text-temp_secondary"
                    : pathname === `/${lng}`
                    ? "text-background"
                    : "text-temp_secondary"
                }`}
                textcolor={
                  scroll && defaultData.color
                    ? defaultData.color
                    : pathname === `/${lng}`
                    ? "white"
                    : defaultData.color
                    ? defaultData.color
                    : "rgba(9, 82, 158,1)"
                }
              >
                <FontAwesomeIcon
                  className="opacity-80 text-sm  group-hover:opacity-100 "
                  icon={faUser}
                />
                <span className=" ">{t("Navbar.menu_items.login")}</span>
              </LangLink>
              <LangLink
                to="/login"
                className={`login__btn--mobile hidden sm:block border-2 rounded-md px-2 py-1 ${
                  scroll
                    ? "text-temp_secondary border-temp_secondary"
                    : pathname === `/${lng}`
                    ? "text-background border-background"
                    : "text-temp_secondary border-temp_secondary"
                }`}
              >
                <FontAwesomeIcon
                  className="text-lg group-hover: "
                  icon={faUser}
                />
              </LangLink>
            </>
          )}

          {/* //! disable add property button */}

          {/* <button
            style={{
              backgroundColor:
                defaultData.color && defaultData.color,
              borderColor:
                defaultData.color && defaultData.color,
            }}
            className={`submit__btn  rounded-full  h-12  flex-center gap-2 px-3   border-2 trns   ss:hidden  text-base font-medium  ${
              scroll
                ? "bg-temp_primary border-temp_primary hover:bg-transparent hover:text-temp_primary text-background"
                : pathname === `/${lng}`
                ? "bg-temp_primary border-temp_primary hover:bg-transparent hover:text-background hover:border-background text-background"
                : "bg-temp_primary border-temp_primary hover:bg-transparent hover:text-temp_primary text-background"
            }`}
            onClick={
              user?.token
                ? () => {
                    dispatchRedux(setCurrTab("submit_property"));
                    setToggleUserInfoNav(false);
                    navigate(`/${lng}/submit-property`);
                  }
                : () => dispatchRedux(setShowLoginPopUp(true))
            }
          >
            <FontAwesomeIcon icon={faHouseMedical} />
            <span className="sm:hidden ">{t("Navbar.menu_items.cta_txt")}</span>
          </button> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
