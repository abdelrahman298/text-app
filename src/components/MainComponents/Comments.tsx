import { RatingComponent } from "../SubComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CommentsProps = {
  data: {
    id: number;
    user_image: string;
    user_name: string;
    user_comment: string;
    stars: number;
    created_at: string;
  }[];
};
function Comments({ data }: CommentsProps) {
  return (
    <div className="mt-7 flex flex-col items-start gap-9">
      {data?.map((comment) => (
        <div
          key={comment?.id}
          className="single__comment flex justify-start gap-12 order-b-[1px] order-b-primary/20 max-w-[70%] md:max-w-full text-temp_secondary"
        >
          <Avatar className="  group w-14 min-w-[56px] h-14 min-h-[56px] p-1.5">
            <div className="avatar__dashed--wrapper w-full h-full border-temp_secondary border-2 rounded-full border-dashed inset-0 absolute group-hover:rotate-180 transition-transform ease-out duration-1000 "></div>
            <AvatarImage
              className="object-cover rounded-full"
              src={comment?.user_image}
            />
            <AvatarFallback>
              {comment?.user_name?.split(" ")?.[0]?.charAt(0)}{" "}
              {comment?.user_name?.split(" ")?.[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h3 className="font-medium mb-1 flex items-center gap-2">
              <span>{comment?.user_name}</span>
              <span className="text-xs opacity-70 ">
                {" "}
                {comment?.created_at}
              </span>
            </h3>
            <p className="text-[14px]">{comment?.user_comment}</p>
            <RatingComponent unMutable defaultRating={comment?.stars} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
