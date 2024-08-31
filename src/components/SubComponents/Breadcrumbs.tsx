import { useLocation } from "react-router-dom";
import { LangLink } from "../MainComponents";
import { cn } from "@/lib/utils";

const Breadcrumbs = ({ className }: { className?: string }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ul
        className={cn(
          "breadcrumb flex justify-center gap-1 text-background rtl:ltr",
          className
        )}
      >
        <li className="breadcrumb-item">
          <LangLink to="">Home /</LangLink>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(1, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={index}
              className={`breadcrumb-item${isLast ? " active" : ""} ${
                index === 0 && "hidden"
              }`}
            >
              {isLast ? (
                // If it's the last item, display the text without a link
                pathname?.replace(/-/g, " ")
              ) : (
                // If it's not the last item, display a link
                <LangLink to={routeTo}>
                  {pathname?.replace(/-/g, " ")} /{" "}
                </LangLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
