import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";

function HeadingUnderline({ className, children, textcolor }: IHeadingsProps) {
  return (
    <h2
      style={{ color: textcolor }}
      className={cn(
        "text-2xl font-medium  w-fit  flex flex-col gap-2 group text-temp_secondary cursor-default",
        className
      )}
    >
      {children}

      <span
        style={{ backgroundColor: textcolor }}
        className="w-1/3 h-0.5 bg-temp_secondary trns group-hover:w-2/3 rounded-full"
      ></span>
    </h2>
  );
}

export default HeadingUnderline;
