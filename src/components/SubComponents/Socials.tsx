import { cn } from "@/lib/utils";
import {
  faFacebook,
  faGooglePlus,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type SocialsProps = {
  data: {
    facebook: string;
    twitter: string;
    google_plus?: string;
    Google?: string;
  };
  className?: string;
  lightBG?: boolean;
};
export default function Socials({ data, className, lightBG }: SocialsProps) {
  return (
    <div className={cn("Property__share--options flex gap-4 ", className)}>
      <a
        href={data?.facebook}
        target="_blank"
        rel="noreferrer"
        className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 ${
          lightBG
            ? "bg-background border-2 border-background text-temp_secondary trns hover:bg-transparent hover:text-background"
            : "bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary"
        }`}
      >
        <FontAwesomeIcon className=" text-2xl" icon={faFacebook} />
      </a>
      <a
        href={data?.twitter}
        target="_blank"
        rel="noreferrer"
        className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 ${
          lightBG
            ? "bg-background border-2 border-background text-temp_secondary trns hover:bg-transparent hover:text-background"
            : "bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary"
        }`}
      >
        <FontAwesomeIcon className=" text-2xl" icon={faXTwitter} />
      </a>
      <a
        href={data?.google_plus}
        target="_blank"
        rel="noreferrer"
        className={`inline-block w-10 aspect-square cursor-pointer rounded-md flex-center active:scale-90 hover:scale-110 ${
          lightBG
            ? "bg-background border-2 border-background text-temp_secondary trns hover:bg-transparent hover:text-background"
            : "bg-temp_secondary border-2 border-temp_secondary text-background trns hover:bg-transparent hover:text-temp_secondary"
        }`}
      >
        <FontAwesomeIcon className=" text-2xl" icon={faGooglePlus} />
      </a>
    </div>
  );
}
