import { cn } from "@/lib/utils";

interface IDashedSeparatorProps {
  className?: string;
  color?: {
    basic_color?: string;
    secondary_color?: string;
    temp_color?: string;
  };
}

function DashedSeparator({ className, color }: IDashedSeparatorProps) {
  return (
    <p
      style={{ color: color?.basic_color }}
      className={cn(
        "text-2xl text-temp_secondary opacity-70 text-center",
        className
      )}
    >
      - - - - - - - - - - -
    </p>
  );
}

export default DashedSeparator;
