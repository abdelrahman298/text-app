import { useFetchData } from "@/Hooks/useAxios";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { LangLink, LogOutPopUp, LoginPopUp } from "@/components/MainComponents";
import { ErrorBoundaryFallback, Socials } from "@/components/SubComponents";
import {
  faArrowRightFromBracket,
  faCommentDots,
  faCommentDollar,
  faHeartCircleCheck,
  faHouseUser,
  faLocationDot,
  faMessage,
  faHouseMedical,
  faUserGear,
  faMobileScreenButton,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  currentUserMenuTab,
  setToggleLogOutPopUp,
  setCurrentUserMenuTab as setCurrTab,
} from "@/app/Features/MiscellaneousSlice";
import { Footer, Navbar, ScrollToTop } from "@/components/LayoutComponents";
import { ErrorBoundary } from "react-error-boundary";
import { Id } from "@/app/Features/AuthenticationSlice";

function SettingsLayout() {
  const { t } = useTranslation("SettingsLayout");

  const { pathname } = useLocation();
  const currTab = useAppSelector(currentUserMenuTab);
  const userId = useAppSelector(Id);
  // const userID = useAppSelector(Id);

  // ? Old USE FetcheData
  // const {
  //   data: userProfileData,
  //   refetch: refetchUserProfileData,
  //   isPending,
  //   isError,
  //   isPaused,
  // } = useFetchData(
  //   "userProfileData",
  //   import.meta.env.VITE_USER_PROFILE_DATA,
  //   false,
  //   false,
  //   "",
  //   30 * 60 * 1000,
  //   30 * 60 * 1000,
  //   true,
  //   true
  // );

  // ! Edited USeFetchData
  const {
    data: userProfileData,
    refetch: refetchUserProfileData,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    "userProfileData",
    import.meta.env.VITE_USER_PROFILE_DATA,
    false,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true,
    "",
    // "",
    false,
    // ! send user and id of the user
    userId,
    "user"
  );

  const dispatchRedux = useAppDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <LoginPopUp t={t} />
      <LogOutPopUp t={t} />
      <ScrollToTop />
      <Navbar />

      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="min-h-[calc(100vh-96px)] pt-24">
          <section className="site_container flex gap-9 h-full  pt-20 pb-44">
            <aside className="fixed__user--nav w-1/4 xl:w-1/3 lg:hidden h-full ">
              <div
                style={{
                  backgroundImage: `url('${userProfileData?.image}')`,
                }}
                className="user__brief--card w-full flex-col-center gap-3 px-5 py-14 bg-   text-background  relative bg-no-repeat  bg-center bg-cover rounded-lg overflow-hidden shadow-md"
              >
                <div className="user__img--blur absolute z-0 inset-0 w-full h-full backdrop-blur-xl bg-black/30    brightness50 "></div>
                <Avatar className="  group w-28  p-2 cursor-default">
                  <div className="avatar__dashed--wrapper w-full h-full border-background border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
                  <AvatarImage
                    className="object-cover rounded-full cursor-default"
                    src={userProfileData?.image}
                  />
                  <AvatarFallback>
                    {userProfileData?.first_name?.charAt(0)}{" "}
                    {userProfileData?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="user__name font-medium text-2xl text-background relative z-10">
                  {userProfileData?.first_name}
                </h1>
                <h3 className="user__address opacity-80 flex-center gap-2 text-sm text-center">
                  <FontAwesomeIcon className="text-lg" icon={faEnvelope} />
                  {userProfileData?.email}
                </h3>
                {/*  <h3 className="user__address opacity-80 flex-center gap-2 text-sm text-center">
                  <FontAwesomeIcon className="text-lg" icon={faLocationDot} />
                  264, Carson Street USA
                {userProfileData?.name} 
                </h3>*/}
                <h3 className="user__address opacity-80 flex-center gap-2 text-sm">
                  <FontAwesomeIcon
                    className="text-lg"
                    icon={faMobileScreenButton}
                  />

                  {userProfileData?.phone}
                </h3>

                <Socials
                  className="mt-3 relative z-10"
                  lightBG
                  data={{
                    facebook: userProfileData?.facebook,
                    twitter: userProfileData?.twitter,
                    google_plus: userProfileData?.google_plus,
                  }}
                />
              </div>
              <ul className="user__settings--menu--items flex flex-col bg-grey   mt-5 shadow-md rounded-lg overflow-hidden">
                <li
                  onClick={() => dispatchRedux(setCurrTab("profile"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
                    (currTab === "profile" || pathname?.includes("profile")) &&
                    "active   "
                  }`}
                >
                  <LangLink
                    to={`/profile`}
                    className="flex gap-2 items-center h-full text-lg "
                  >
                    <FontAwesomeIcon className="text-" icon={faUserGear} />
                    <span className=" ">{t("menu.profile")}</span>
                  </LangLink>
                </li>
                <li
                  onClick={() => dispatchRedux(setCurrTab("messages"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
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
                    <span className=" ">{t("menu.messages")}</span>
                  </LangLink>
                </li>
                <li
                  onClick={() => dispatchRedux(setCurrTab("reviews"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
                    (currTab === "reviews" || pathname?.includes("reviews")) &&
                    "active   "
                  }`}
                >
                  <LangLink
                    to={`/reviews`}
                    className="flex gap-2 items-center h-full text-lg "
                  >
                    <FontAwesomeIcon className="text-" icon={faCommentDots} />
                    <span className=" ">{t("menu.reviews")}</span>
                  </LangLink>
                </li>
                {/* //! remove add property button */}
                {/* <li
                  onClick={() => dispatchRedux(setCurrTab("submit_property"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
                    (currTab === "submit_property" ||
                      pathname?.includes("submit-property")) &&
                    "active   "
                  }`}
                >
                  <LangLink
                    to={`/submit-property`}
                    className="flex gap-2 items-center h-full text-lg "
                  >
                    <FontAwesomeIcon className="text-" icon={faHouseMedical} />
                    <span className=" ">{t("menu.submit_property")}</span>
                  </LangLink>
                </li> */}
                {/* //! remove add property button */}
                {/* <li
                  onClick={() => dispatchRedux(setCurrTab("my_properties"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
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
                    <span className=" ">{t("menu.my_properties")}</span>
                  </LangLink>
                </li>
                */}
                <li
                  onClick={() => dispatchRedux(setCurrTab("my_offers"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
                    (currTab === "my_offers" ||
                      pathname?.includes("my-offers")) &&
                    "active   "
                  }`}
                >
                  <LangLink
                    to={`/my-offers`}
                    className="flex gap-2 items-center h-full text-lg "
                  >
                    <FontAwesomeIcon className="text-" icon={faCommentDollar} />
                    <span className=" truncate">{t("menu.my_offers")}</span>
                  </LangLink>
                </li>
                <li
                  onClick={() => dispatchRedux(setCurrTab("favorites"))}
                  className={`user__settings--menu--item w-full px-4 h-14  border-y-2 border-y-background  ${
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
                    <span className=" ">{t("menu.favorites")}</span>
                  </LangLink>
                </li>
                <li
                  className={`user__settings--menu--item w-full px-4 h-14  border-t-2 border-t-background  `}
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
                    <span className=" ">{t("menu.log_out")}</span>
                  </button>
                </li>
              </ul>
            </aside>

            <section className="outlet__user--settings w-3/4 xl:w-3/3 lg:w-full h-full bg-red-40">
              <Outlet
                context={[
                  userProfileData,
                  refetchUserProfileData,
                  isPending,
                  isError,
                  isPaused,
                ]}
              />
            </section>
          </section>
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default SettingsLayout;
