import { useGetTransactionsService } from "@/services/api/services/transactions";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  TransactionFilterType,
  TransactionSortType,
} from "../transaction-filter-types";

export const transactionsQueryKeys = createQueryKeys(["transactions"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: TransactionFilterType | undefined;
        sort?: TransactionSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useTransactionListQuery = ({
  sort,
  filter,
}: {
  filter?: TransactionFilterType | undefined;
  sort?: TransactionSortType | undefined;
} = {}) => {
  const fetch = useGetTransactionsService();

  const query = useInfiniteQuery({
    queryKey: transactionsQueryKeys.list().sub.by({ sort, filter }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
          filters: filter,
          sort: sort ? [sort] : undefined,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });

  return query;
};
