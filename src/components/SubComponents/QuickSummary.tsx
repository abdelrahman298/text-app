import { cn } from "@/lib/utils";
import { memo } from "react";
interface Summary {
  id: number;
  key: string;
  value: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

const QuickSummary = memo(function QuickSummary({
  data,
  className,
}: {
  data: Summary[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-5 3xl:grid-cols-2 ss:grid-cols-1  w-full ",
        className
      )}
    >
      {data?.map((item) => (
        <li className="flex gap-1 justify- text-lg" key={item?.id}>
          <h4 className=" min-w-fit font-medium">{item?.key} :</h4>
          <h5 className=""> {item?.value}</h5>
        </li>
      ))}
    </ul>
  );
});

export default QuickSummary;
