import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Transaction } from "../types/user";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";

export type TransactionsRequest = {
  page: number;
  limit: number;
  filters?: {
    roles?: Role[];
  };
  sort?: Array<{
    orderBy: keyof Transaction;
    order: SortEnum;
  }>;
};

export type TransactionsResponse = InfinityPaginationType<Transaction>;

export function useGetTransactionsService() {
  const fetch = useFetch();

  return useCallback(
    (data: TransactionsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/transactions`);
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
      }).then(wrapperFetchJsonResponse<TransactionsResponse>);
    },
    [fetch]
  );
}

export type TransactionRequest = {
  signature: Transaction["signature"];
};

export type TransactionResponse = Transaction;

export function useGetTransactionService() {
  const fetch = useFetch();

  return useCallback(
    (data: TransactionRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/transactions/${data.signature}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<TransactionResponse>);
    },
    [fetch]
  );
}

export type TransactionPostRequest = Pick<
  Transaction,
  "index" | "is_vote" | "meta" | "signature" | "slot" | "transaction"
> & {
  password: string;
};
