"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useBlockListQuery } from "./queries/block-queries";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import { BlockMeta } from "@/services/api/types/user";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { useRouter, useSearchParams } from "next/navigation";
import TableSortLabel from "@mui/material/TableSortLabel";
import { BlockFilterType } from "./block-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";

type BlocksKeys = keyof BlockMeta;

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: BlocksKeys;
    order: SortEnum;
    column: BlocksKeys;
    handleRequestSort: (
      event: React.MouseEvent<unknown>,
      property: BlocksKeys
    ) => void;
  }>
) {
  return (
    <TableCell
      style={{ width: props.width }}
      sortDirection={props.orderBy === props.column ? props.order : false}
    >
      <TableSortLabel
        active={props.orderBy === props.column}
        direction={props.orderBy === props.column ? props.order : SortEnum.ASC}
        onClick={(event) => props.handleRequestSort(event, props.column)}
      >
        {props.children}
      </TableSortLabel>
    </TableCell>
  );
}

function Blocks() {
  const { t: tBlocks } = useTranslation("admin-panel-blocks");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: BlocksKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: BlocksKeys
  ) => {
    const isAsc = orderBy === property && order === SortEnum.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SortEnum.DESC : SortEnum.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({
      order: newOrder,
      orderBy: newOrderBy,
    });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter) as BlockFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useBlockListQuery({ filter, sort: { order, orderBy } });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as BlockMeta[]) ??
      ([] as BlockMeta[]);

    return removeDuplicatesFromArrayObjects(result, "slot");
  }, [data]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} pt={3}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs>
            <Typography variant="h3">
              {tBlocks("admin-panel-blocks:title")}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} mb={2}>
          <TableVirtuoso
            style={{ height: "75vh" }}
            data={result}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableCell style={{ width: 50 }}></TableCell>
                  <TableSortCellWrapper
                    width={100}
                    orderBy={orderBy}
                    order={order}
                    column="slot"
                    handleRequestSort={handleRequestSort}
                  >
                    {tBlocks("admin-panel-blocks:table.column1")}
                  </TableSortCellWrapper>
                  <TableCell style={{ width: 200 }}>
                    {tBlocks("admin-panel-blocks:table.column2")}
                  </TableCell>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="slot"
                    handleRequestSort={handleRequestSort}
                  >
                    {tBlocks("admin-panel-blocks:table.column3")}
                  </TableSortCellWrapper>

                  <TableCell style={{ width: 80 }}>
                    {tBlocks("admin-panel-blocks:table.column4")}
                  </TableCell>
                  <TableCell style={{ width: 130 }}></TableCell>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableCellLoadingContainer colSpan={6}>
                      <LinearProgress />
                    </TableCellLoadingContainer>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(index, block) => (
              <>
                <TableCell style={{ width: 50 }}></TableCell>
                <TableCell style={{ width: 100 }}>{block?.slot}</TableCell>
                <TableCell style={{ width: 200 }}>{block?.blockhash}</TableCell>
                <TableCell style={{ width: 200 }}>
                  {block?.parent_slot}
                </TableCell>
                <TableCell>
                  {new Date(block?.block_time).toLocaleString()}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

// export default withPageRequiredAuth(Blocks, { roles: [RoleEnum.ADMIN] });
export default Blocks;
