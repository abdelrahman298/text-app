import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { CiLocationOn } from "react-icons/ci";

import {
  faBath,
  faBed,
  faBoltLightning,
  faMaximize,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faGooglePlus,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import LangLink from "../MainComponents/LangLink.tsx";
import { IUserData } from "@/types/index.ts";
import { useExternalData, usePostData } from "@/Hooks/useAxios.tsx";
import { IPropertyCardData } from "@/types/CardsTypes.ts";
import { cn } from "@/lib/utils.ts";
import { TFunction } from "i18next";
import { defaultData } from "../../../src//Utilities/style";

type PropertyCardProps = {
  card: IPropertyCardData;
  user: IUserData | null;
  ShowLoginPopUp: () => void;
  t: TFunction;
  onSuccess?: (x: number) => void;
  slider?: true | false;
  color?: {
    basic_color: string;
    secondary_color: string;
  };
  withBullet?: true | false;
  featuredCard?: true | false;
  border?: true | false;
  className?: string;
  alignment?: "vertical" | "horizontal";
  lng?: any;
};
const PropertyCard = memo(function PropertyCard({
  card,
  user,
  ShowLoginPopUp,
  t,
  slider,
  color,
  withBullet,
  border,
  featuredCard,
  className,
  alignment = "vertical",
  onSuccess,
}: PropertyCardProps) {
  const { mutate } = usePostData(true, () =>
    //like or unlike the property from all pages doesn't have onSuccuss but favorites page can only unlike the property, so it has onSuccess
    onSuccess ? onSuccess(card?.id) : ""
  );
  // console.log(card);
  const { data: externalData } = useExternalData();

  return (
    <div
      //! pt => to allow transform translate
      //! px => to pervent cropping the card from th edge if used in slider
      className={cn(
        ` group ${
          slider
            ? "min-h-[630px] pt-2 px-1"
            : withBullet
            ? "min-h-[655px] pt-2"
            : "h-fit"
        }  relative  overflow-   w-full bg-transparent  `,
        className
      )}
    >
      <div
        className={`for__shadow shadow-lg w-full h-auto hover:-translate-y-2  transition-all duration-500 ease-in-out ${
          border ? "border" : ""
        } ${alignment === "vertical" ? "" : "flex gap-5"} `}
      >
        <div
          className={`img-card-wrapper  ${
            alignment === "vertical"
              ? "w-full  h-[250px] max-w-full"
              : "w-1/2  h-auto max-w-[50%]"
          }      round relative  group`}
        >
          <div className="img__wrapper w-full h-full overflow-hidden round ">
            <LangLink
              to={`/properties/${card?.listing_number}/${card?.title?.replace(
                /\s/g,
                "-"
              )}`}
            >
              {" "}
              <img
                className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 trns"
                src={card?.primary_image}
                alt={card?.title}
                loading="lazy"
              />
            </LangLink>
          </div>
          {(featuredCard || card?.normal_featured === "featured") && (
            <div
              style={{ backgroundColor: defaultData?.color.secondary_color }}
              className="property__featured absolute text-xl flex-center rounded-b-sm top-0 left-3 rtl:left-auto rtl:right-3 w-10 h-14 text-background z-40"
            >
              <FontAwesomeIcon icon={faBoltLightning} />
            </div>
          )}

          <div className="agent__details--purpose p-3  flex justify-between items-center bg-background text-temp_secondary rounded-sm h-fit gap-3  absolute bottom-5 right-1/2 translate-x-1/2 w-[87%] rtl:ltr">
            <LangLink
              to={`/agents/${
                card?.broker_details?.[0]?.id
              }/${card?.broker_details?.[0]?.name?.replace(/\s/g, "-")}`}
              title={card?.broker_details?.[0]?.name}
              className="agent__details  flex justify-start items-center  gap-2 max-w-[70%] rtl:ltr"
              textcolor={defaultData?.color?.basic_color}
            >
              <img
                src={card?.broker_details?.[0]?.img}
                alt={card?.broker_details?.[0]?.name}
                className="agent__img w-8 aspect-square cursor-pointer object-fill rounded-full border-[1px] border-temp_secondary"
              />
              <p
                style={{
                  color:
                    defaultData.color.secondry_color &&
                    defaultData.color.secondry_color,
                }}
                className="text-sm truncate max-w-full"
              >
                {card?.broker_details?.[0]?.name}
              </p>
            </LangLink>

            <p
              style={{ backgroundColor: defaultData.color.secondary_color }}
              className={`text-background  px-3 h-8 flex-center  rounded-sm font-medium text-xs axs:text-[10px]`}
            >
              {t("PropertyCard.for_what", {
                context: card?.for_what,
              })}
            </p>
          </div>
        </div>
        <div
          className={`property__details bg-background  h-fit pt-5  text-temp_secondary  ${
            alignment === "vertical" ? "w-full  " : "w-1/2  h-auto max-w-[50%]"
          }`}
        >
          <h5
            style={{
              color:
                defaultData?.color?.basic_color &&
                defaultData?.color?.basic_color,
            }}
            className="property__type pl-2 rtl:pl-0 rtl:pr-2  mb-1 text-temp_secondary font-medium text-xl border-l-2 ml-3 rtl:ml-0 rtl:mr-3 border-l-temp_secondary rtl:border-l-0 rtl:border-r-2 rtl:border-r-temp_secondary  h-fit leading-"
          >
            {card?.property_type}
          </h5>

          <div
            style={{
              color:
                defaultData?.color?.basic_color &&
                defaultData?.color?.basic_color,
            }}
            className="title__location--contact p-3   h-fit"
          >
            <LangLink
              to={`/properties/${card?.listing_number}/${card?.title?.replace(
                /\s/g,
                "-"
              )}`}
              className="Featured__slide--title text-2xl leading-7 font-medium block truncate "
              title={card?.title}
              textcolor={defaultData?.color?.secondary_color}
            >
              {card?.title}
            </LangLink>
            <h5 className="Featured__slide--location text-sm opacity- truncate">
              {card?.address}
            </h5>
            <div className="w-full flex gap-2 mt-3 font-bold items-center text-[13px] ">
              <CiLocationOn className="text-2xl" /> <span>{card?.country}</span>{" "}
              |<span>{card?.city}</span> |<span>{card?.region}</span>
            </div>

            <div className="w-full flex gap-2 font-bold">
              <span></span>
            </div>
          </div>
          <div
            style={{
              color:
                defaultData?.color?.basic_color &&
                defaultData?.color?.basic_color,
            }}
            className="property__details--mid pl-3 pr-6 rtl:pl-6 rtl:pr-3 flex justify-between gap-2 items-center h-fit bg-green-3    w-full   "
          >
            <h5 className="property__price  text-base  w-fit    ">
              <span className="opacity-70 ">
                {t("PropertyCard.Start_From")}
              </span>{" "}
              <br />
              <span
                style={{
                  color:
                    defaultData?.color?.basic_color &&
                    defaultData?.color?.basic_color,
                }}
                className="text-temp_secondary font-medium text-lg"
              >
                {t("PropertyCard.price_formatted", {
                  context: card?.for_what,
                  sale_price: card?.sale_price,
                  rent_price: card?.rent_price,
                  curr: card?.currency,
                  duration: card?.rent_duration,
                })}
              </span>
            </h5>
            <div className="property__share--love flex justify-end gap- items-center ">
              <div
                className="property__love cursor-pointer borderx-[1px] borderx-temp_secondary20 py-6 mr-4 rtl:mr-0 rtl:ml-4 px3"
                onClick={!user?.token ? ShowLoginPopUp : () => {}}
              >
                <label className="love__btn">
                  {user?.token && (
                    <input
                      defaultChecked={Number(card?.is_fav)}
                      type="checkbox"
                      id={card?.id?.toString()}
                      onChange={() =>
                        mutate({
                          api: import.meta.env.VITE_PROPERTY_ADD_TO_FAVORITE,
                          data: { property_id: card?.id },
                        })
                      }
                    />
                  )}

                  <div className="checkmark">
                    <svg viewBox="0 0 256 256">
                      <rect fill="none" height="256" width="256"></rect>
                      <path
                        className="stroke-accnt"
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        strokeWidth="15px"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                </label>
              </div>
              <div className="group/parent w-fit h-auto  ">
                <FontAwesomeIcon
                  className="text-2xl cursor-pointer"
                  icon={faShareNodes}
                />
                <div className="absolute right-0 rtl:right-auto rtl:left-0  -translate-y-0 pt-[23px] w-36   bg- z-[44] opacity-0  pointer-events-none trns group-hover/parent:opacity-100 group-hover/parent:pointer-events-auto  ">
                  <div className="flex flex-col items-start border-[1px] border-background rounded-sm overflow-hidden shadow-lg">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="h-10 w-full bg-grey hover:text-background hover:bg-temp_secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5 items-center cursor-pointer gap-3"
                      href={card?.facebook}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faFacebook} />{" "}
                      {t("PropertyCard.share_options.Facebook")}
                    </a>
                    <div className="w-full h-[0.05rem] bg-background"></div>

                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="h-10 w-full bg-grey hover:text-background hover:bg-temp_secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5  items-center cursor-pointer gap-3"
                      href={card?.twitter}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faXTwitter} />{" "}
                      {t("PropertyCard.share_options.Twitter")}
                    </a>
                    <div className="w-full h-[0.05rem] bg-background"></div>

                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="h-10 w-full bg-grey hover:text-background hover:bg-temp_secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5  items-center cursor-pointer gap-3"
                      href={card?.google_plus}
                    >
                      <FontAwesomeIcon
                        className="text-lg"
                        icon={faGooglePlus}
                      />{" "}
                      {t("PropertyCard.share_options.Google")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="separator border-t-temp_secondary20 border-t-[1px] border-dashed  h-[1px] mx-4 mt-"></div>
          <div className="Featured__slide--description p-3  ">
            <h5
              dangerouslySetInnerHTML={{ __html: card?.description }}
              style={{
                color:
                  defaultData?.color?.basic_color &&
                  defaultData?.color?.basic_color,
              }}
              className=" text-base  line-clamp-2 opacity-70 min-h-[40px]"
            ></h5>
          </div>
          <div
            style={{
              color:
                defaultData?.color?.basic_color &&
                defaultData?.color?.basic_color,
            }}
            className={`property__details--bottom  px-3 py-5 
         flex justify-between items-start h-fit w-full gap-1 ${
           alignment === "vertical" ? "bg-grey  " : "bg-background"
         } `}
          >
            <h5 className="property__size xxl:text-center text-xs font-medium axs:text-[10px]">
              <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faMaximize}
              />
              {t("PropertyCard.area_formatted", {
                area: card?.land_area,
              })}
            </h5>
            <h5 className="bedrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
              <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faBed}
              />{" "}
              {t("PropertyCard.Bedrooms", {
                count: card?.bed_rooms_no,
              })}
            </h5>
            <h5 className="bathrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
              <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faBath}
              />{" "}
              {t("PropertyCard.Bathrooms", {
                count: card?.bath_room_no,
              })}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PropertyCard;
