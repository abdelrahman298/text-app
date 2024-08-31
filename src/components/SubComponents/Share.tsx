import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { FacebookProvider, ShareButton } from "react-facebook";

import {
  faFacebook,
  faGooglePlus,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";
import { TFunction } from "i18next";
type ShareProps = {
  type: string;
  data: { facebook: string; twitter: string; google_plus: string };
  t: TFunction;
  className?: string;
  color?: string;
};
function Share({ type, className, data, t, color }: ShareProps) {
  return (
    <div
      className={cn(
        `under__slider--share   w-full flex  h-12 ss:h-auto justify-center items-center ss:flex-col ss:gap-1`,
        className
      )}
    >
      <h5
        style={{ backgroundColor: color }}
        className="property__size text-center  w-1/4 bg-temp_secondary text-background h-full flex items-center justify-center text- font-medium ss:w-full ss:h-12 border-r-4 border-r-background ss:border-r-temp_secondary xl:text-sm lg:text-base"
      >
        {t("ShareComponent.txt", { context: type })}
      </h5>{" "}
      {/* <FacebookShareButton
        title="dsaewewq"
        openShareDialogOnClick
        url={
          "https://demo.lanacrm.com/en/properties/PROP-2492/The%20best%20property?fbclid=IwAR0NOrkPgGgC0NnNLGaJ0reByuoSBntKkyErIYkYY7ZcANh8fis9VaIzU58?imageurl=https%3A%2F%2Fcdn.lanacrm.com%2Fimages%2Fproperties%2FPROP-2492%2Fimage.jpg"
        }
      >
        <FacebookIcon />
      </FacebookShareButton> */}
      <div className="w-3/4 ss:w-full flex justify-between items-center bg-grey h-12">
        {/* //! old facebook button */}
        {/* <a
          href={`${data?.facebook}/
          <head>
            <meta
              property="og:image"
              content={
                "https://demo.lanacrm.com/en/properties/PROP-2492/The%20best%20property"
              }
            />
          </head>
          `}
          target="_blank"
          rel="noreferrer"
          className="bedrooms__number cursor-pointer h-full flex justify-center items-center text-base  ss:text-sm w-1/3 "
        >
          <FontAwesomeIcon
            className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl"
            icon={faFacebook}
          />
          {t("ShareComponent.Facebook")}{" "}
        </a>{" "} */}
        {/* //! new facebook button */}
        <a
          href={`facebook.com/sharer/sharer.php?u=https://twitter.com`}
          target="_blank"
          rel="noreferrer"
          className="bedrooms__number cursor-pointer h-full flex justify-center items-center text-base  ss:text-sm w-1/3 "
        >
          <FontAwesomeIcon
            className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl"
            icon={faFacebook}
          />
          {t("ShareComponent.Facebook")}{" "}
        </a>
        <div className="w-1 h-full bg-background"></div>
        <a
          href={data?.twitter}
          target="_blank"
          rel="noreferrer"
          className="bathrooms__number cursor-pointer h-full flex justify-center items-center text-base  ss:text-sm w-1/3 "
        >
          <FontAwesomeIcon
            className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl"
            icon={faXTwitter}
          />{" "}
          {t("ShareComponent.Twitter")}
        </a>{" "}
        <div className="w-1 h-full bg-background"></div>
        <a
          href={data?.google_plus}
          target="_blank"
          rel="noreferrer"
          className="bathrooms__number cursor-pointer h-full flex justify-center items-center text-base  ss:text-sm w-1/3 "
        >
          <FontAwesomeIcon
            className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl"
            icon={faGooglePlus}
          />{" "}
          {t("ShareComponent.Google")}
        </a>
      </div>
    </div>
  );
}

export default Share;
