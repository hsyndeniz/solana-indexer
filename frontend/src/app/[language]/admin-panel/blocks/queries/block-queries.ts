import { useGetBlocksService } from "@/services/api/services/blocks";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BlockFilterType, BlockSortType } from "../block-filter-types";

export const blocksQueryKeys = createQueryKeys(["blocks"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: BlockFilterType | undefined;
        sort?: BlockSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useBlockListQuery = ({
  sort,
  filter,
}: {
  filter?: BlockFilterType | undefined;
  sort?: BlockSortType | undefined;
} = {}) => {
  const fetch = useGetBlocksService();

  const query = useInfiniteQuery({
    queryKey: blocksQueryKeys.list().sub.by({ sort, filter }).key,
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
