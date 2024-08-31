import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";

function Heading({ className, children, color }: IHeadingsProps) {
  return (
    <h1
      style={{ color: color?.basic_color }}
      className={cn(
        "text-3xl   uppercase font-semibold  text-temp_secondary text-center ",
        className
      )}
    >
      {children}
    </h1>
  );
}

export default Heading;
