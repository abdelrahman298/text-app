import { ITestimonialCardData } from "@/types/CardsTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { RatingComponent } from "../SubComponents";

function TestimonialCard({
  card,
  slider,
  color,
}: {
  card: ITestimonialCardData;

  slider: true | false;
  color?: {
    basic_color: string | any;
    secondary_color: string | any;
  };
}) {
  return (
    <div
      className={`${
        slider ? "w-full" : "w-[500px]"
      }  min-h-[370px]    text-temp_primary rounded-lg group   flex-col flex justify-center  items-center bg-background  p-9 `}
    >
      <div className="w-full h-full shadow-black/5 shadow-[10px_10px_20px_15px] ">
        <div className="w-full h-full min-h-[330px] sm:min-h-[430px] relative p-9  border-green-00 flex-col-center shadow-[16px_16px_2px_0px] shadow-[#F8F8F9]">
          <div
            style={{ backgroundColor: color?.secondary_color }}
            className="quote__absolute  bg-temp_secondary rounded-lg shadow-lg absolute w-[70px] aspect-square top-0 right-0 translate-x-1/2 -translate-y-1/2 flex-center text-background text-5xl"
          >
            <FontAwesomeIcon
              className="group-hover:rotate-180 transition-transform ease-out duration-1000"
              icon={faQuoteLeft}
            />
          </div>
          <p className="testimonial__comment italic text-center text- opacity-70 line-clamp-3 lg:line-clamp-6 md:line-clamp-3 sm:line-clamp-6  bg-red-00 min-h-[90px mb-1 px-0.5">
            {card?.comment}
          </p>

          <Avatar className="  group w-24 mt-1 p-1.5">
            <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
            <AvatarImage
              className="object-cover rounded-full"
              src={card?.img}
            />
            <AvatarFallback>
              {card?.name?.split(" ")?.[0]?.charAt(0)}{" "}
              {card?.name?.split(" ")?.[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h3
            style={{ color: color }}
            className="testimonial__name font-medium text-xl mt-3 text-temp_secondary"
          >
            {card?.name}
          </h3>
          <RatingComponent
            className="w-fit"
            unMutable
            defaultRating={card?.stars}
          />
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
