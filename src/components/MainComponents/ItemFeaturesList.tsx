import { cn } from "@/lib/utils";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Feature {
  id: number;
  title: string;
}
function ItemFeaturesList({
  data,
  className,
}: {
  data: Feature[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        " grid grid-cols-3 gap-5 3xl:grid-cols-2 ss:grid-cols-1  w-full",
        className
      )}
    >
      {data?.map((item) => (
        <li key={item?.id} className="flex justify-start items-center gap-2 text-lg">
         
         <FontAwesomeIcon className="text-xl" icon={faCircleCheck} />  {item?.title}
          
        </li>
      ))}
    </ul>
  );
}

export default ItemFeaturesList;
