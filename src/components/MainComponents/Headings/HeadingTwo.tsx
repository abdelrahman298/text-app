import { cn } from "@/lib/utils";
import { IHeadingsProps } from "@/types";
function HeadingTwo({
  className,
  children,
  colored = true,
  color,
}: IHeadingsProps) {
  const Text = children?.split(" ");
  return (
    <h2
      className={cn(
        "text-4xl sm:text-2xl  uppercase font-semibold  text-center ss:text-",
        className
      )}
    >
      <span
        style={{ color: color?.basic_color }}
        className={cn(
          `${colored ? "text-temp_secondary" : "text-temp_secondary"}`,
          className
        )}
      >
        {Text?.slice(0, 2)?.join(" ")}
      </span>
      <span
        style={{ color: color?.basic_color }}
        className={cn("text-temp_secondary", className)}
      >
        {" "}
        {Text?.slice(2)?.join(" ")}
      </span>
    </h2>
  );
}

export default HeadingTwo;
