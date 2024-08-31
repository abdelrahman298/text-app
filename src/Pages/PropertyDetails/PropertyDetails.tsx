import { useFetchData, useExternalData } from "@/Hooks/useAxios";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { CiLocationOn } from "react-icons/ci";
import { AsideForm, PropertiesCategories } from "@/components/AsideComponents";
import {
  Comments,
  HeadingUnderline,
  HelmetTags,
  ItemFeaturesList,
  ItemSlider,
  SendMessageForm,
  SideBarSearchForm,
  Heading,
  SubHeading,
  LangLink,
} from "@/components/MainComponents";
import {
  ErrorMessage,
  LineChart,
  Loader,
  NoItemsMessage,
  QuickSummary,
  Share,
} from "@/components/SubComponents";
import { IPropertyCardData, ISinglePropertyDetails } from "@/types/CardsTypes";
import {
  faBath,
  faBed,
  faChevronRight,
  faCircleCheck,
  faEnvelope,
  faEye,
  faMaximize,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionHeader,
} from "@/components/ui/accordion";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { PropertyCard } from "@/components/CardsComponents";
import {
  setShowLoginPopUp,
  userData,
} from "@/app/Features/AuthenticationSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { TFunction } from "i18next";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { defaultData } from "../../../src/Utilities/style.js";

register();

function SimilarProperties({
  t,
  data,
  className,
}: {
  t: TFunction;
  data: IPropertyCardData[];
  // data: ISinglePropertyDetails["similar_properties"];
  className?: string;
}) {
  const swiperElRef = useRef(null);
  const user = useAppSelector(userData);
  const dispatchRedux = useAppDispatch();

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      loop: true,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    };

    Object.assign(swiperElRef?.current, swiperParams);
    if (data) {
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  return (
    <div
      className={cn("Property__SIMILAR--PROPERTIES site_container ", className)}
    >
      <div className="flex justify-between items-center ss:justify- mb-7 px-1">
        <HeadingUnderline className="text-2xl">
          {t("headings.SIMILAR_PROPERTIES")}
        </HeadingUnderline>
        <div
          className={`featured__slider--arrows flex justify-end gap-5 items-center ss:hidden ${
            data?.length < 3 ? "hidden" : "flex"
          }`}
        >
          <button
            onClick={() => {
              swiperElRef?.current?.swiper?.slidePrev();
            }}
            className={`prev-slider-btn bg-transparent text-temp_secondary  border-2 border-temp_secondary hover:scale-105  justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10 `}
          >
            <FontAwesomeIcon
              className="rotate-180 rtl:rotate-0 text-lg font-bold transition-all duration-300 ease-in-out active:scale-90 "
              icon={faChevronRight}
            />
          </button>
          <button
            onClick={() => {
              swiperElRef?.current?.swiper?.slideNext();
            }}
            className="prev-slider-btn bg-temp_secondary text-background  border-2 border-temp_secondary hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-10 w-10"
          >
            <FontAwesomeIcon
              className="rtl:rotate-180 text-lg font-bold"
              icon={faChevronRight}
            />
          </button>
        </div>
      </div>
      <swiper-container init={false} ref={swiperElRef}>
        {data?.map((card) => (
          <swiper-slide key={card?.id}>
            <PropertyCard
              key={card?.id}
              card={card}
              user={user}
              slider
              featuredCard
              ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
              t={t}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export function Component() {
  const { data: externalData } = useExternalData();

  const { t, i18n } = useTranslation("Pages_PropertyDetails");

  const { propertyNumber } = useParams();
  const {
    isPending,
    isError,
    isPaused,
    data,
  }: {
    isPending: boolean;
    isError: boolean;
    isPaused: boolean;
    data: ISinglePropertyDetails;
  } = useFetchData(
    "PropertyDetails",
    `${import.meta.env.VITE_SINGLE_PROPERTY_DETAILS}${propertyNumber}`,
    false,
    true,
    propertyNumber,
    5000,
    0,
    true,
    true
  );

  useFetchData(
    "increaseViews",
    `${import.meta.env.VITE_INCREASE_SINGLE_PROPERTY_VIEWS}${data?.id}`,
    false,
    true,
    propertyNumber,
    5000,
    0,
    !!data
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [propertyNumber]);
  useEffect(() => {
    if (data) {
      let RecentlyViewedPropertiesArray =
        JSON.parse(sessionStorage.getItem("rvpa")) || [];

      if (!RecentlyViewedPropertiesArray.includes(data?.listing_number)) {
        // Add the unique value to the array
        RecentlyViewedPropertiesArray?.unshift(data?.listing_number);
        const newArray = RecentlyViewedPropertiesArray?.splice(0, 3);
        // Save the updated array back to sessionStorage
        sessionStorage.setItem("rvpa", JSON.stringify(newArray));
      }
    }
  }, [data]);

  if (isError || isPaused) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <ErrorMessage message={t("ErrorMessage")} />
      </div>
    );
  }
  if (isPending) {
    return <Loader className="  h-[calc(100vh-135px)] mb-32" />;
  }

  return (
    <section>
      <section className=" site_container  bg- flex justify-between items-start pt-20 gap-0 lg:gap-16 pb-16 lg:pb-44 lg:flex-col lg:items-center lg:justify-start text-temp_secondary">
        <HelmetTags
          title={data?.title + t("tab.title")}
          description={data?.description || ""}
          keywords={data?.keywords || ""}
          canonical={`${i18n.language}/properties/${
            data?.listing_number
          }/${data?.title?.replace(/\s/g, "-")}`}
        />
        <section className="Property__Details--content min-h-screen w-[66%] flex flex-col gap-12 bg- lg:w-full">
          <div className="Property__general--info w-full">
            <ItemSlider className="mb-10" data={data} />

            <Heading
              color={defaultData.color}
              className="Property__title  text-3xl text-start  "
            >
              {data?.title?.toUpperCase()}
            </Heading>
            <div className="Property__price--for--what my-4 flex justify-between items-center gap-5 ss:flex-col ss:items-start ss:gap-2">
              <h2 className="Property__price text-xl bg-accnt text-background px-2 py-1 rounded-md  uppercase font-medium">
                {t("PropertyCard.price_formatted", {
                  context: data?.for_what,
                  sale_price: data?.sale_price,
                  rent_price: data?.rent_price,
                  curr: data?.currency,
                  duration: data?.rent_duration,
                })}
              </h2>

              <h3
                style={{ backgroundColor: defaultData.color }}
                className="Property__for--what  bg-temp_secondary px-2 py-1  text-background rounded-md shadow-sm "
              >
                {t("PropertyCard.for_what", {
                  context: data?.for_what,
                })}
              </h3>
            </div>
            <div className="Property__id--views flex justify-between items-center gap-5 ss:flex-col ss:items-start ss:gap-2">
              <h3
                style={{ color: defaultData.color }}
                className="Property__name text-xl font-bold  r"
              >
                {t("property_id_word")}{" "}
                <span className="font-normal">{data?.listing_number}</span>
              </h3>
              <h3 className="Property__name text-lg font-bold   r">
                {data?.views > 0 && (
                  <p className="flex justify-center items-center gap-2 ">
                    <FontAwesomeIcon
                      className="text-lg "
                      icon={faEye}
                      color={defaultData.color}
                    />
                    <p
                      style={{ color: defaultData.color }}
                      className="font-normal "
                    >
                      {data?.views} {t("views_word")}
                    </p>
                  </p>
                )}
              </h3>
            </div>

            <SubHeading
              color={defaultData.color}
              className="Property__address   text-temp_secondary text-justify mt-2"
            >
              {data?.address}
            </SubHeading>
            <div
              style={{ color: defaultData.color }}
              className="w-full flex gap-2 mt-2 font-bold items-center"
            >
              <CiLocationOn className="text-xl" /> <span>{data?.country}</span>{" "}
              |<span>{data?.city}</span> |<span>{data?.region}</span>
            </div>

            <Share
              color={defaultData.color}
              className="mt-10"
              data={{
                facebook: data?.facebook,
                twitter: data?.twitter,
                google_plus: data?.google_plus,
              }}
              t={t}
              type="property"
            />
          </div>
          <div className="Property__description ">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {" "}
              {t("headings.description")}
            </HeadingUnderline>
            <p
              style={{ color: defaultData.color }}
              className="mt-7 "
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></p>
          </div>
          <div className="Property__BENEFITS--aminities w-full">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {t("headings.details")}
            </HeadingUnderline>

            <div className="w-full mt-7 grid grid-cols-2 sm:grid-cols-1 gap-7 ">
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.buildingNumber")} :
                </span>
                <span>{data?.building_num.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.floorNumber")} :</span>
                <span>{data?.floor_num.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.apartmentNumber")} :
                </span>
                <span>{data?.apartment_num.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.unitfloor")} :</span>
                <span>{data?.unit_floor}</span>
              </div>

              {data?.for_what === "for_sale" ? (
                <div
                  style={{ color: defaultData.color }}
                  className="row-span-1 col-span-1 flex justify-between items-center"
                >
                  <span className="font-bold">{t("details.salePrice")} :</span>
                  <span>
                    {data?.sale_price.toLocaleString("en-US")} {data?.currency}
                  </span>
                </div>
              ) : data?.for_what === "for_rent" ? (
                <div
                  style={{ color: defaultData.color }}
                  className="row-span-1 col-span-1 flex justify-between items-center"
                >
                  <span className="font-bold">{t("details.rentPrice")}:</span>
                  <span style={{ color: defaultData.color }}>
                    {t("PropertyCard.price_formatted", {
                      context: data?.for_what,
                      sale_price: data?.sale_price,
                      rent_price: data?.rent_price,
                      curr: data?.currency,
                      duration: data?.rent_duration,
                    })}
                  </span>
                </div>
              ) : (
                <>
                  <div
                    style={{ color: defaultData.color }}
                    className="row-span-1 col-span-1 flex justify-between items-center"
                  >
                    <span className="font-bold">
                      {t("details.salePrice")} :
                    </span>
                    <span>
                      {data?.sale_price.toLocaleString("en-US")}{" "}
                      {data?.currency}
                    </span>
                  </div>

                  <div
                    style={{ color: defaultData.color }}
                    className="row-span-1 col-span-1 flex justify-between items-center"
                  >
                    <span className="font-bold">
                      {t("details.rentPrice")} :
                    </span>
                    <span>
                      {t("PropertyCard.price_formatted", {
                        context: data?.for_what,
                        sale_price: data?.sale_price,
                        rent_price: data?.rent_price,
                        curr: data?.currency,
                        duration: data?.rent_duration,
                      })}
                    </span>
                  </div>
                </>
              )}
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.landarea")} :</span>
                <span>{data?.land_area.toLocaleString("en-US")} </span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.floorsNumber")} :</span>
                <span>{data?.no_floors.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.roomensuite")} :</span>
                <span>{data?.room_ensuite.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.receptionpieces")} :
                </span>
                <span>{data?.reception_pieces.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.bedroomsnumber")} :
                </span>
                <span>{data?.bed_rooms_no.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.kitchensnumber")} :
                </span>
                <span>{data?.kitchens_no.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.livingRoom")} :</span>
                <span>{data?.living_room.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">
                  {t("details.bathroomsnumber")} :
                </span>
                <span>{data?.bath_room_no.toLocaleString("en-US")}</span>
              </div>

              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.garagenumber")} :</span>
                <span>{data?.garage_no.toLocaleString("en-US")}</span>
              </div>
              <div
                style={{ color: defaultData.color }}
                className="row-span-1 col-span-1 flex justify-between items-center"
              >
                <span className="font-bold">{t("details.garagearea")} :</span>
                <span>{data?.garage_size.toLocaleString("en-US")}</span>
              </div>
            </div>
          </div>

          {data?.summary?.length > 0 && (
            <div className="Property__Quick--summary w-full">
              <HeadingUnderline className="text-2xl">
                {" "}
                {t("headings.QuickSummary")}
              </HeadingUnderline>
              <QuickSummary className="mt-7" data={data?.summary} />
            </div>
          )}
          {data?.aminities?.length > 0 && (
            <div className="Property__BENEFITS--aminities w-full">
              <HeadingUnderline className="text-2xl">
                {" "}
                {t("headings.aminities")}{" "}
              </HeadingUnderline>
              <ItemFeaturesList className="mt-7" data={data?.aminities} />
            </div>
          )}
          <div className="Property__views--chart ">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {t("headings.VIEWS")}{" "}
            </HeadingUnderline>
            <LineChart
              className="mt-7"
              title={t("headings.line_chart_title", {
                currant_year: new Date().getFullYear(),
              })}
              dataSetTitle={data?.title}
              dataSets={data?.chart}
            />
          </div>
          <div className="Property__location ">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {t("headings.LOCATION")}
            </HeadingUnderline>
            <div
              className="iframe__fixed--height w-full border-2 border-temp_secondary rounded-md  mt-7 "
              dangerouslySetInnerHTML={{
                __html: data?.location,
              }}
            ></div>
          </div>
          <div className="Property__VIDEO">
            <HeadingUnderline
              textcolor={defaultData.color}
              className="text-2xl"
            >
              {t("headings.VIDEO")}{" "}
            </HeadingUnderline>

            <iframe
              loading="lazy"
              className="  w-full !aspect-video overflow-hidden border-2 border-temp_secondary rounded-md mt-7"
              src={`https://www.youtube.com/embed/${data?.video?.substring(
                32
              )}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          {data?.autocad?.length > 0 && (
            <div className="Property__FLOOR--PLAN">
              <HeadingUnderline
                textcolor={defaultData.color}
                className="text-2xl"
              >
                {t("headings.FLOOR_PLAN")}{" "}
              </HeadingUnderline>

              <Accordion
                type="single"
                collapsible
                className="w-full mt-7 flex flex-col gap-5"
              >
                {data?.autocad?.map((item, i) => (
                  <AccordionItem
                    className="border border-temp_secondary rounded-sm"
                    id={item?.id}
                    key={item?.id}
                    value={`item-${item?.id}`}
                  >
                    <AccordionHeader asChild>
                      <AccordionTrigger bg={defaultData.color}>
                        <h6
                          style={{ color: defaultData.color }}
                          className="flex items-center font-normal gap-2"
                        >
                          {t("FLOOR_PLAN.title")} {i + 1}
                        </h6>
                      </AccordionTrigger>
                    </AccordionHeader>

                    <AccordionContent className="flex-center">
                      <img
                        loading="lazy"
                        className="w-auto h-[600px] md:h-auto max-w-[600px] max-h-[600px] block object-cover"
                        src={item?.src}
                        alt={item?.title}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          {data?.comments?.length > 0 && (
            <div className="Property__COMMENTS">
              <HeadingUnderline className="text-2xl">
                {t("headings.COMMENTS")}
              </HeadingUnderline>
              {data?.comments?.length === 0 ? (
                <NoItemsMessage message={t("NoItemsMessage_comments")} />
              ) : (
                <Comments data={data?.comments} />
              )}
            </div>
          )}
          <div className="Property__LEAVE--COMMENT">
            <HeadingUnderline className="text-2xl">
              {t("headings.LEAVE_COMMENT_word")}
            </HeadingUnderline>
            <SendMessageForm
              params={{ property_id: data?.id as any }}
              api={import.meta.env.VITE_SINGLE_PROPERTY_LEAVE_COMMENT}
              type="PropertyDetails__Comment"
              t={t}
              showRating
            />
          </div>
          {data?.similar_properties?.length > 0 && (
            <SimilarProperties
              className="mb- lg:block hidden"
              t={t}
              data={data?.similar_properties as any}
            />
          )}
        </section>
        <aside className=" Property__Details--aside w-[31%] lg:w-3/4 md:w-full h-fit flex flex-col lg:items-center gap-16 ">
          <section className="PROPERTY__OWNER  bg-grey p-6 rounded-lg  flex flex-col items-start gap-9 w-full">
            <HeadingUnderline className="text-start ">
              {t("aside.PROPERTY_OWNER")}
            </HeadingUnderline>

            <LangLink
              to={`/agents/${
                data?.broker_details?.[0]?.id
              }/${data?.broker_details?.[0]?.name?.replace(/\s/g, "-")}`}
              className="PROPERTY__OWNER--details flex justify-start items-start gap-5 bg- w-full"
            >
              <Avatar className=" rounded-none  w-28 max-w-[112px] aspect-auto">
                <AvatarImage
                  className="object-cover "
                  src={data?.broker_details?.[0]?.logo}
                />
                <AvatarFallback className="rounded-none w-28 aspect-square bg-background text-temp_secondary text-xl">
                  {data?.broker_details?.[0]?.name?.split(" ")?.[0]?.charAt(0)}{" "}
                  {data?.broker_details?.[0]?.name?.split(" ")?.[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="PROPERTY__OWNER--name--description">
                <h3 className="text-lg font-medium">
                  {data?.broker_details?.[0]?.name}
                </h3>
                {data?.broker_details?.[0]?.description && (
                  <p className="text-sm opacity-70">
                    {data?.broker_details?.[0]?.description}
                  </p>
                )}
              </div>
            </LangLink>

            <div className="PROPERTY__OWNER--name--contact-info w-full flex flex-row gap-3">
              {/* Old Broker Details */}
              {/* {data?.broker_details?.[0]?.phone && (
                <h3 className="flex justify-start items-center gap-3">
                  <span className="font-medium"> {t("aside.Phone")}</span>
                  <a
                    rel="noreferrer"
                    href={`tel:${data?.broker_details?.[0]?.phone}`}
                    className="text-sm  opacity-70 truncate"
                  >
                    {data?.broker_details?.[0]?.phone}
                  </a>
                </h3>
              )}
             
              {data?.broker_details?.[0]?.mobile && (
                <h3 className="flex justify-start items-center gap-3">
                  <span className="font-medium">{t("aside.Mobile")} </span>
                  <a
                    rel="noreferrer"
                    href={`tel:${data?.broker_details?.[0]?.mobile}`}
                    className="text-sm  opacity-70 truncate"
                  >
                    {data?.broker_details?.[0]?.mobile}
                  </a>
                </h3>
              )}
              {data?.broker_details?.[0]?.email && (
                <h3 className="flex justify-start items-center gap-3 ">
                  <span className="font-medium min-w-fit">
                    {t("aside.Email")}
                  </span>
                  <a
                    rel="noreferrer"
                    href={`mailto:${data?.broker_details?.[0]?.email}`}
                    className="text-sm  opacity-70  truncate"
                  >
                    {data?.broker_details?.[0]?.email}
                  </a>
                </h3>
              )} */}

              {/* //? New Broker Details */}
              {/*//!  WhatsApp */}
              {data?.broker_details?.[0]?.phone && (
                <a
                  rel="noreferrer"
                  // prevent the href
                  // href={`https://wa.me/`}
                  href={`https://wa.me/+2{phoneNumber}?text=${encodeURIComponent(
                    `hello `
                  )}`}
                  target="_blank"
                  className="flex justify-start items-center gap-3 bg-green-500
               text-white p-3 display-block rounded-lg w-fit
               hover:bg-white transition duration-500
                 hover:text-green-500 border-2 border-green-500  hover:cursor-pointer"
                >
                  <span className="font-medium   ">
                    {/* {t("AgentInfoComponent.Phone")} */}
                    Whatsapp
                    <FontAwesomeIcon
                      className="ml-2 fa-solid"
                      icon={faWhatsapp}
                    />
                  </span>
                </a>
              )}
              {/*//!  Phone Number */}
              {data?.broker_details?.[0]?.phone && (
                <a
                  rel="noreferrer"
                  // prevent the href
                  // href={`tel:${data?.phone}`}
                  className="flex justify-start items-center gap-3 bg-red-500
               text-white p-3 display-block rounded-lg w-fit
               hover:bg-white transition duration-500
                hover:text-red-500 border-2 border-red-500  hover:cursor-pointer"
                >
                  <span className="font-medium ">
                    {/* {t("AgentInfoComponent.Phone")} */}
                    Call
                    <FontAwesomeIcon
                      className="ml-2 fa-solid fa-phone"
                      icon={faPhone}
                    />
                  </span>
                </a>
              )}
              {/* //! Email */}
              {data?.broker_details?.[0]?.email && (
                <a
                  rel="noreferrer"
                  // href={`mailto:${data?.email}`}
                  className="flex justify-start items-center gap-3 bg-cyan-700
              text-white p-3 display-block rounded-lg w-fit
              hover:bg-white transition duration-500
             hover:text-cyan-700 border-2 border-cyan-700  hover:cursor-pointer"
                >
                  <span className="font-medium">
                    {/* {t("AgentInfoComponent.Email")} */}
                    Email
                    <FontAwesomeIcon
                      className="ml-2 fa-solid"
                      icon={faEnvelope}
                    />
                  </span>
                </a>
              )}
            </div>
            <div className="PROPERTY__OWNER--separator w-3/4 h-[1px] bg-temp_secondary opacity-20"></div>
            <AsideForm
              params={{ vendor_id: data?.broker_details?.[0]?.id }}
              api={import.meta.env.VITE_SEND_MESSAGE_TO_AGENT}
              type="message"
              Bgcolor="dark"
              t={t}
            />
          </section>
          <section className="MAKE__YOUR--OFFER  bg-grey p-6  rounded-lg flex flex-col items-start gap-9 w-full">
            <HeadingUnderline className="text-start w-">
              {t("aside.MAKE_YOUR_OFFER")}
            </HeadingUnderline>
            <AsideForm
              params={{
                vendor_id: data?.broker_details?.[0]?.id,
                property_id: data?.id,
              }}
              api={import.meta.env.VITE_SEND_OFFER_TO_AGENTS}
              type="offer"
              for_what={data?.for_what}
              Bgcolor="dark"
              t={t}
            />
          </section>
          <SideBarSearchForm />
        </aside>
      </section>
      {data?.similar_properties?.length > 0 && (
        <SimilarProperties
          className="mb-40 lg:hidden"
          t={t}
          data={data?.similar_properties as any}
        />
      )}
    </section>
  );
}
