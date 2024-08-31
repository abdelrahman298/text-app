import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";

function SubHeading({ className, children, color }: IHeadingsProps) {
  return (
    <p
      style={{ color: color?.basic_color }}
      className={cn(
        "text-base mt-1 text-temp_primary opacity-80 text-center",
        className
      )}
    >
      {children}
    </p>
  );
}

export default SubHeading;
