import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useCallback } from "react";
import useWindowSize from "@/Hooks/useWindowSize";
import { TFunction } from "i18next";
type PaginationProps = {
  page: number | string;
  setPage: React.Dispatch<React.SetStateAction<number | string>>;
  lastPage: number | string;
  t: TFunction;
  fullWidth?: string;
  isPreviousData?: boolean;
};
function Pagination({
  page,
  setPage,
  lastPage,
  isPreviousData = false,
  fullWidth = "w-full",
  t,
}: PaginationProps) {
  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();
  type PaginationState = { page: number | string };

  type PaginationAction = {
    type: string;
    payload: number | string;
  };

  function reducer(state: PaginationState, action: PaginationAction) {
    switch (action.type) {
      case "setPage": {
        return {
          ...state,
          page: action.payload,
        };
      }

      default:
        throw Error("Unknown action: " + action.type);
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    page: page || 1,
  });
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state.page]);
  const previousPage = useCallback(() => {
    setPage((prev) => +prev - 1);
    setSearchParams(
      (params) => {
        params.set("page", (Number(state.page) - 1) as any);
        return params;
      },
      { replace: true }
    );
    dispatch({ type: "setPage", payload: Number(state.page) - 1 });
  }, [setPage, setSearchParams, state.page]);

  const NextPage = () => {
    setPage((prev) => +prev + 1);
    setSearchParams(
      (params) => {
        params.set("page", (Number(state.page) + 1) as any);
        return params;
      },
      { replace: true }
    );
    dispatch({ type: "setPage", payload: Number(state.page) + 1 });
  };

  const PaginationChange = useCallback(
    (e) => {
      setPage(Number(e.selected + 1));
      setSearchParams(
        (params) => {
          params.set("page", Number(e.selected + 1) as any);
          return params;
        },
        { replace: true }
      );
      dispatch({ type: "setPage", payload: Number(e.selected + 1) });
    },
    [setPage, setSearchParams]
  );

  return (
    <nav
      className={`all__properties--pagination trns ${fullWidth} flex justify-between items-center my-16`}
    >
      <div
        className={`w-fit ${
          (+page <= 1 || isPreviousData) && "cursor-not-allowed"
        } ${+lastPage > 1 ? "block" : "hidden"}`}
      >
        <button
          disabled={+page <= 1 || isPreviousData}
          className="  flex border-2 border-temp_secondary pr-[9px] rtl:pr-[0px] rtl:pl-[9px] w-[105px] rtl:w-[85px] h-9 md:w-9 md:rtl:w-9 md:pr-[0px] md:rtl:pl-[0px]  md:justify-center  justify-end items-center  gap-2 hover:gap-3 transition-all duration-300 ease-in-out text-temp_secondary disabled:opacity-50 disabled:pointer-events-none "
          onClick={previousPage}
        >
          <FontAwesomeIcon
            className="rotate-180 rtl:rotate-0"
            icon={faArrowRight}
          />
          <span className={`md:hidden `}>{t("Pagination.Previous")}</span>
        </button>
      </div>
      <ReactPaginate
        previousLinkClassName="pagination__previous"
        nextLinkClassName="pagination__next"
        breakLabel="..."
        pageCount={Number(lastPage)}
        onPageChange={(e) => PaginationChange(e)}
        marginPagesDisplayed={width && width > 1000 ? 3 : 1}
        pageRangeDisplayed={width && width > 1000 ? 5 : 1}
        renderOnZeroPageCount={null}
        containerClassName="pagination__wrapper"
        activeClassName="active__page--pagination"
        forcePage={+page - 1}
      />
      <div
        className={`w-fit ${
          (+page >= +lastPage || isPreviousData) && "cursor-not-allowed"
        } ${+lastPage > 1 ? "block" : "hidden"}`}
      >
        <button
          disabled={+page >= +lastPage || isPreviousData}
          className=" pl-[9px] rtl:pl-[0px] rtl:pr-[9px] w-[75px] h-9 md:w-9 md:pl-[0px] md:rtl:pr-[0px] md:justify-center  flex justify-start items-center gap-2  hover:gap-3 transition-all duration-300 ease-in-out  border-2 border-temp_secondary bg-temp_secondary text-background disabled:opacity-50 disabled:pointer-events-none "
          onClick={NextPage}
        >
          <span className={`md:hidden `}>{t("Pagination.Next")}</span>
          <FontAwesomeIcon className="rtl:rotate-180 " icon={faArrowRight} />
        </button>
      </div>
    </nav>
  );
}
export default Pagination;
