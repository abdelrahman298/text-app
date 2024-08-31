import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  useFetchData,
  useExternalData,
  usePostData,
} from "../../Hooks/useAxios.tsx";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { LangLink } from "../MainComponents/index.ts";
import { IPropertyCardData } from "@/types/CardsTypes.ts";
import { defaultData } from "../../../src/Utilities/style.js";

function Footer() {
  const { t } = useTranslation("LayoutComponents");
  const { data: externalData } = useExternalData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      from: "Web",
    },
  });
  const {
    mutate,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    reset();
  });
  const { data } = useFetchData(
    "Footer",
    import.meta.env.VITE_FOOTER,
    false,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000
  );

  const onSubmit = (data) => {
    mutate({ api: import.meta.env.VITE_SUBSCRIBE, data: data });
  };

  return (
    <footer
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.9))`,
      }}
      className="relative bg-fixed bg-no-repeat  bg-center bg-cover bg-blend-overlay w-full h-auto text-background pt-40 ss:pt-44 pb-10 mt-28  first-line:rounded-t-[23.2px]  "
    >
      <div
        style={{ backgroundColor: defaultData.color.secondary_color }}
        className="absolute__banner rounded-md absolute site_container h-48 lg:h-auto lg:min-h-[208px] top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-temp_secondary flex lg:flex-col lg:justify-center items-center gap-5  text-background py-5 px-10 ss:px-5"
      >
        <div
          style={{ backgroundColor: defaultData.color }}
          className="absolute__banner--text w-4/6 lg:w-full h-full lg:h-fit  flex flex-col gap-2 justify-center items-start lg:items-center "
        >
          <h3 className="text-5xl xl:text-4xl ss:text-2xl font-bold sm:text-center line-clamp-2 rtl:text-4xl rtl:ss:text-2xl ">
            {data?.top_banner?.big_text}
          </h3>
          <h4 className="sm:text-center line-clamp-2">
            {data?.top_banner?.small_text}
          </h4>
        </div>
        <div className="absolute__banner--form w-2/6 lg:w-full h-full lg:h-fit flex justify-end items-center lg:justify-center pt-2">
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full "
          >
            <div className=" flex w-full  flex-col items-start justify-start gap-2 h-  ">
              <div className="relative  w-full rounded-sm overflow-hidden">
                <input
                  className="dark-bg-inputs w-full shadow-none focus:shadow-none"
                  type="text"
                  placeholder={t("Footer.fourth_column.email.placeholder")}
                  autoComplete="on"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-z][A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                <button
                  disabled={!isValid}
                  type="submit"
                  className={` bg-accnt text-background text- w-24  flex-center absolute top-0 right-0 rtl:right-auto rtl:left-0 h-full ${
                    isValid ? "opacity-100" : "opacity-90 cursor-not-allowed"
                  }`}
                >
                  {isPending ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <>{t("Footer.top_banner.Subscribe")}</>
                  )}
                </button>
              </div>
              {errors.email && (
                <p className=" text-xs text-red-200">
                  {errors.email.type === "required" &&
                    t("Footer.fourth_column.email.required_msg")}
                  {errors.email.type === "pattern" &&
                    t("Footer.fourth_column.email.pattern_msg")}
                </p>
              )}
              {
                //!--- server errors --------
                ServerErrors?.response?.data?.errors?.email[0] && (
                  <p className="pt-2 text-xs text-error">
                    {ServerErrors?.response?.data?.errors?.email[0]}
                  </p>
                )
              }
            </div>
          </form>
        </div>
      </div>
      <section className="footer-content-grid footer-auto-fit h-full bgbg  site_container ">
        <div className="footer-col1-logo  h-full flex flex-col gap-4 ss:items-center px-3 ">
          <LangLink to="">
            <img
              className="logo  w-24 max-w-[96px]"
              src={defaultData?.white_logo}
              alt="logo"
            />
          </LangLink>

          <p className="text-base text-justify font-sub-heading w-fit opacity80 ss:text-center line-clamp-3 ">
            {data?.about?.about}
          </p>
          <ul className="website__contacts flex-col flex gap-3">
            <li>
              <span className="font-medium">
                {t("Footer.first_column.Location")}
              </span>
              :{" "}
              <Link rel="noreferrer" target="_blank" to={data?.location}>
                {data?.address}
              </Link>
            </li>
            <li>
              <span className="font-medium">
                {t("Footer.first_column.Email")}
              </span>
              :{" "}
              <Link
                rel="noreferrer"
                target="_blank"
                to={`mailto:${data?.email}`}
              >
                {data?.email}
              </Link>
            </li>
            <li>
              <span className="font-medium">
                {t("Footer.first_column.Website")}
              </span>
              :{" "}
              <Link
                rel="noreferrer"
                target="_blank"
                to={data?.about?.linked_text_link}
              >
                {data?.about?.linked_text_link}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-col2 w-full h-full flex flex-col justify-start ss:items-center px-3  ">
          <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
            {t("Footer.second_column.title")}
            <span className="w-1/3 h-0.5 bg-background trns group-hover:w-2/3 rounded-full"></span>
          </h2>

          <ul className="  h-full w-full flex flex-col items-start  justify-start gap-7 ss:items-center ">
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <LangLink
                className=" truncate "
                to={t("Footer.second_column.menu_items.Home.link")}
              >
                {t("Footer.second_column.menu_items.Home.title")}
              </LangLink>
            </li>

            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <LangLink
                className=" truncate "
                to={t("Footer.second_column.menu_items.FAQs.link")}
              >
                {t("Footer.second_column.menu_items.FAQs.title")}
              </LangLink>
            </li>
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <LangLink
                className="  truncate  "
                to={t("Footer.second_column.menu_items.Contact.link")}
              >
                {t("Footer.second_column.menu_items.Contact.title")}
              </LangLink>
            </li>

            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <LangLink
                className="  truncate  "
                to={t("Footer.second_column.menu_items.About.link")}
              >
                {t("Footer.second_column.menu_items.About.title")}
              </LangLink>
            </li>
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <LangLink
                className="  truncate  "
                to={t("Footer.second_column.menu_items.Terms_Conditions.link")}
              >
                {t("Footer.second_column.menu_items.Terms_Conditions.title")}
              </LangLink>
            </li>
          </ul>
        </div>
        <div className="footer-col3 w-full h-full flex flex-col justify-start ss:items-center px-3  ">
          <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
            {t("Footer.third_column.title")}
            <span className="w-1/3 h-0.5 bg-background trns group-hover:w-2/3 rounded-full"></span>
          </h2>

          <ul className="  h-full w-full flex flex-col items-start  justify-start gap-7 ss:items-center ">
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <Link
                rel="noreferrer"
                target="_blank"
                to={`mailto:${data?.email}`}
                className="truncate"
              >
                {data?.email}
              </Link>
            </li>
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <Link
                rel="noreferrer"
                target="_blank"
                to={data?.location}
                // className="truncate"
              >
                {data?.address}
              </Link>
            </li>
            <li className="w-fit opacity-80 hover:opacity-100 trns   hover:translate-x-3 hover:scale-105">
              <Link to={`tel:${data?.phone}`} className="truncate">
                {data?.phone}
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-col4 w-full h-full flex flex-col justify-start ss:items-center px-3 ">
          <h2 className="text-xl w-fit mb-9 flex flex-col gap-2 group">
            {t("Footer.fourth_column.title")}
            <span className="w-1/3 h-0.5 bg-background trns group-hover:w-2/3 rounded-full"></span>
          </h2>{" "}
          <ul className="  h-full flex flex-col items-start md:items-center justify-start gap-7 ss:items-center ">
            {data?.props?.slice(0, 3)?.map((prop: IPropertyCardData) => (
              <li key={prop?.id}>
                <LangLink
                  className="flex justify-between gap-4"
                  to={`/properties/${
                    prop?.listing_number
                  }/${prop?.title?.replace(/\s/g, "-")}`}
                >
                  <div className="group w-24 min-w-[96px] h-20 rounded-md overflow-hidden ">
                    <img
                      className="w-full h-full object-cover"
                      src={prop?.primary_image}
                      alt={prop?.title}
                    />
                  </div>
                  <div className="  flex flex-col gap-1 justify-start items-start ">
                    <h6 title={prop?.title} className="line-clamp-2 text-lg">
                      {prop?.title}
                    </h6>
                    <span className="text-xs opacity-80">
                      {prop?.created_at}
                    </span>
                  </div>
                </LangLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr className="border-[1px] border-background my-10" />
      <div className="footer_bottom flex site_container md:flex-col md:items-center gap-7 justify-between items-center px-3 ">
        <h5 className="text-background text-sm md:text-center">
          © {data?.about?.copy_right} {""}
          <Link
            rel="noreferrer"
            target="_blank"
            to={data?.about?.linked_text_link}
            className="trns hover:text-accnt"
          >
            {data?.about?.linked_text}
          </Link>
          .
        </h5>
        <div className="socials w-fit flex  items-center gap-4 ">
          <Link rel="noreferrer" target="_blank" to={data?.facebook}>
            <FontAwesomeIcon
              className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
              icon={faFacebook}
            />
          </Link>
          <Link rel="noreferrer" target="_blank" to={data?.twitter}>
            <FontAwesomeIcon
              className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
              icon={faXTwitter}
            />
          </Link>
          <Link rel="noreferrer" target="_blank" to={data?.instagram}>
            <FontAwesomeIcon
              className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
              icon={faInstagram}
            />
          </Link>
          <Link rel="noreferrer" target="_blank" to={data?.youtube}>
            <FontAwesomeIcon
              className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
              icon={faYoutube}
            />
          </Link>
          <Link rel="noreferrer" target="_blank" to={data?.linkedIn}>
            <FontAwesomeIcon
              className="text-3xl hover:scale-125 active:scale-90 hover:text-accnt duration-200 transition-all cursor-pointer"
              icon={faLinkedinIn}
            />
          </Link>
        </div>
        {/*  <div className="platforms flex justify-start items-center gap-7">
          <Link rel="noreferrer" target="_blank" to={data?.about?.android_app}>
            <img className="h-10" src={googleplay} alt="googleplay" />
          </Link>
          <Link rel="noreferrer" target="_blank" to={data?.about?.ios_app}>
            <img className="h-10" src={appstore} alt="appstore" />
          </Link>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
