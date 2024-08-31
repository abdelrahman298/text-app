import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { userData } from "@/app/Features/AuthenticationSlice.tsx";
import { useAppSelector } from "../app/reduxHooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IUserData } from "@/types/index.ts";
import { useHandleLogOut } from "@/Utilities";
import { IdefaultData } from "@/types/CardsTypes";

interface fetcherFunctionProps {
  api: string;
  authorizedAPI: boolean | undefined;
  user: IUserData | null;
  lang: string;
  addToken: boolean;
  userID?: number | null | undefined;
  userEP?: string | undefined;
}

async function GetExternalData() {
  return await axios.get(
    "https://lanacrm.com/demo_control_apps/public/api/project-assets/Lana%20CRM"
  );
}
export function useExternalData() {
  return useQuery({
    queryKey: ["ExternalData"],
    queryFn: GetExternalData,
    select: (data) => data.data.data as IdefaultData,
  });
}

const FetcherFunction = async ({
  api,
  // authorizedAPI,
  user,
  lang,
  // addToken,
  userID,
  userEP,
}: fetcherFunctionProps) => {
  const headers = user?.token
    ? {
        // Authorization: `Bearer ${user?.token}`,
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
        lang: lang,
        // "Access-Control-Allow-Credentials": true,

        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      }
    : {
        "Content-Type": "application/json",
        lang: lang,
        // "Access-Control-Allow-Credentials": true,

        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      };

  console.log(user?.token);

  // ! There's no external Api which exrtracted from api
  // const ExternalAPI = await axios.get(
  //   "https://lanacrm.com/demo_control_apps/public/api/project-assets/Lana%20CRM",
  //   {
  //     headers: headers,
  //   }
  // );

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINTS_BASE_URL,
  });

  // ! OLD axiosget
  // const res = await axiosInstance.get(api, {
  //   headers: headers,
  // });

  if (userEP && userID) {
    const newapi = `${api}/${userEP}/${userID}`;
    const res = await axiosInstance.get(newapi, {
      headers: headers,
    });
    console.log("this from fetcher Function with new api   " + newapi);

    return res.data?.data;
  } else {
    const res = await axiosInstance.get(api, {
      headers: headers,
    });

    console.log(
      "axious FROM FetcherFX: your sent api is " +
        api +
        " and your response is " +
        JSON.stringify(res.data?.data)
    );

    return res.data?.data;
  }

  // const res = await axiosInstance.get(api, {
  //   headers: headers,
  // });
  // return res.data?.data;

  // return res.data?.data;
};

// ! OLD USEFETCHDATA
// export const useFetchData = (
//   identifier: string,
//   api: string,
//   showToasts?: boolean,
//   select?: boolean,
//   id: string | number = "",
//   cacheTime = 5000,
//   staleTime = 0,
//   enabled = true,
//   authorizedAPI?: boolean,
//   onSuccess?: "" | ((data) => void),
//   onError?: "" | (() => void),
//   addToken: boolean = false
// ) => {
//   const navigate = useNavigate();
//   const user = useAppSelector(userData);
//   const { i18n } = useTranslation();
//   const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
//   const [logOut] = useHandleLogOut();

//   const useQueryOptions = {
//     onSuccess: (data) => {
//       console.log("useFetchData from custom hook", identifier, data, api);
//       showToasts && toast.success(data.message);
//       onSuccess && onSuccess();
//     },
//     onError: (error) => {
//       /*       console.log(identifier, enabled);
//        */ showToasts &&
//         toast.error(
//           error?.response?.data?.message || "Something Wrong has happened!"
//         );
//       console.log("error from custom hook", identifier, error, api);
//       error?.response?.status === 404 && navigate(`/${lang}/not-found`);

//       // ! prevent the logout from invoke despite of the status 401
//       // if (authorizedAPI && error?.response?.status === 401) {
//       //   navigate(`/${lang}/login`, { replace: true });
//       //   logOut();
//       // }
//     },
//     select: (data) => {
//       /*       console.log(identifier, data, api);
//        */
//       return select ? data[0] : data;
//     },
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     enabled: enabled,
//     cacheTime: cacheTime,
//     staleTime: staleTime,
//     retry: 1,
//   };
//   return useQuery({
//     queryKey: [identifier, id],
//     queryFn: () =>
//       FetcherFunction({ api, authorizedAPI, user, lang, addToken }),
//     ...useQueryOptions,
//   });
// };

/////////////////////////////////////////////////////////////////////

// ! Edited useFetchData
// ? USE Fetcher
export const useFetchData = (
  identifier: string,
  api: string,
  showToasts?: boolean,
  select?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  onSuccess?: "" | ((data) => void),
  // onError?: "" | (() => void),
  addToken: boolean = false,
  userID?: number | null | undefined,
  userEP?: string
) => {
  const navigate = useNavigate();
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useQueryOptions = {
    onSuccess: (data) => {
      console.log("useFetchData from custom hook", identifier, data, api);
      showToasts && toast.success(data.message);
      onSuccess && onSuccess("");
    },
    onError: (error) => {
      /*       console.log(identifier, enabled);
       */ showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      console.log("error from custom hook", identifier, error, api);
      error?.response?.status === 404 && navigate(`/${lang}/not-found`);

      // ! prevent the logout from invoke despite of the status 401
      // if (authorizedAPI && error?.response?.status === 401) {
      //   navigate(`/${lang}/login`, { replace: true });
      //   logOut();
      // }
    },
    select: (data) => {
      /*       console.log(identifier, data, api);
       */
      return select ? data[0] : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };
  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      FetcherFunction({
        api,
        authorizedAPI,
        user,
        lang,
        addToken,
        userID,
        userEP,
      }),
    ...useQueryOptions,
  });
};

// ? USE Fetcher Parallel
export const useFetchParallelData = (
  identifier: string,
  iterators: string[],
  api: string,
  // showToasts?: boolean,
  // select?: boolean,
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  authorizedAPI?: boolean,
  addToken: boolean = false
) => {
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };

  return useQueries({
    queries: iterators.map((iterator) => {
      return {
        queryKey: [identifier, iterator],
        queryFn: () =>
          FetcherFunction({
            api: api + iterator,
            authorizedAPI,
            user,
            lang,
            addToken,
          }),
        ...useQueryOptions,
      };
    }),
  });
};

export const useFetchPaginatedData = (
  identifier: string,
  id: string | number = "",
  api: string,
  showToasts = false,
  cacheTime = 500000,
  staleTime = 0,
  enabled = true,
  authorizedAPI = false,
  addToken: boolean = false
) => {
  const user = useAppSelector(userData);
  const navigate = useNavigate();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const [logOut] = useHandleLogOut();

  const useFetchPaginatedDataOptions = {
    onSuccess: (data) => {
      console.log("from custom hook", identifier, data, api);
      showToasts && toast.success(data.message);
    },
    onError: (error) => {
      /*       console.log(identifier, error);
       */
      console.log("error from custom hook", identifier, error, api);

      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      // ! prevent the logout from invoke despite of the status 401

      // if (authorizedAPI && error?.response?.status === 401) {
      //   navigate(`/${lang}/login`, { replace: true });
      //   logOut();
      // }
    },
    select: (data) => {
      /*       console.log(identifier, id, data);
       */
      return data?.original;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    refetchOnReconnect: true,
    staleTime: staleTime,
    retry: 1,
    keepPreviousData: true,
  };

  console.log(
    "axious: FROM useFetchPagination " +
      api +
      " " +
      authorizedAPI +
      " " +
      user +
      " " +
      lang +
      " " +
      addToken
  );

  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      FetcherFunction({ api, authorizedAPI, user, lang, addToken }),
    ...useFetchPaginatedDataOptions,
  });
};

// ! used for register and login data
export const usePostData = (
  showToasts = false,
  onSuccess?: (data: any) => void,
  authorizedAPI?: boolean,
  onError?: (err: any) => void
) => {
  const user = useAppSelector(userData);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  interface posterFunctionProps {
    api: string;
    data?: object;
    file?: boolean;
  }

  // ! /////////////////////////////////////////

  const posterFunction = async ({ api, data, file }: posterFunctionProps) => {
    const ContentType = file ? "multipart/form-data" : "application/json";
    // console.log("this is from poster Function" + api, data);

    const headers = user?.token
      ? {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": ContentType,
          lang: lang,
        }
      : {
          "Content-Type": ContentType,
          lang: lang,
        };
    const options = {
      url: api,
      method: "POST",
      headers: headers,
      data: data,
    };
    // ? old code ExternalAPI = await axios.get
    // const ExternalAPI = await axios.get(
    //   "https://lanacrm.com/demo_control_apps/public/api/project-assets/Lana%20CRM",
    //   {
    //     headers: headers,
    //   }
    // );
    // ? new code

    // const axiosInstance = axios.create({
    //   baseURL: `${ExternalAPI?.data?.data?.api_url}web/`,
    // });

    // ! send the website base URL with endpoint api/web/
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_ENDPOINTS_BASE_URL,
    });

    const res = await axiosInstance(options);
    console.log(`from custom hook q aaaa`, res.data);

    return res.data;
  };

  // ! /////////////////////////////////////////
  const usePostDataOptions = {
    onSuccess: (data) => {
      console.log("POST Success from custom hook", data);
      console.log("from custom hook q bbb", data);

      showToasts && toast.success(data.message);
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      console.log("error from custom hook", error);
      onError && onError(error);
      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );

      // ! prevent the logout from invoke despite of the status 401

      // authorizedAPI &&
      //   error?.response?.status === 401 &&
      //   navigate(`/${lang}/login`, { replace: true });
    },
  };
  //console.log(api);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: posterFunction,
    ...usePostDataOptions,
  });
};
