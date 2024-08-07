import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { BlockMeta, User } from "../types/user";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";

export type UsersRequest = {
  page: number;
  limit: number;
  filters?: {
    roles?: Role[];
  };
  sort?: Array<{
    orderBy: keyof BlockMeta;
    order: SortEnum;
  }>;
};

export type UsersResponse = InfinityPaginationType<BlockMeta>;

export function useGetBlocksService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/blocks`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<UsersResponse>);
    },
    [fetch]
  );
}

export type UserRequest = {
  id: User["id"];
};

export type UserResponse = User;

export function useGetUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/blocks/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<UserResponse>);
    },
    [fetch]
  );
}

export type UserPostRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "photo" | "role"
> & {
  password: string;
};
