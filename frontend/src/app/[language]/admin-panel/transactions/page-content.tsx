"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useTransactionListQuery } from "./queries/transaction-queries";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import { Transaction } from "@/services/api/types/user";
import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { useRouter, useSearchParams } from "next/navigation";
import TableSortLabel from "@mui/material/TableSortLabel";
import { TransactionFilterType } from "./transaction-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";

type TransactionKeys = keyof Transaction;

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: TransactionKeys;
    order: SortEnum;
    column: TransactionKeys;
    handleRequestSort: (
      event: React.MouseEvent<unknown>,
      property: TransactionKeys
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

function Transactions() {
  const { t: tTransactions } = useTranslation("admin-panel-transactions");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: TransactionKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: TransactionKeys
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
      return JSON.parse(searchParamsFilter) as TransactionFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTransactionListQuery({
      filter,
      sort: { order, orderBy },
    });

  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Transaction[]) ??
      ([] as Transaction[]);

    return removeDuplicatesFromArrayObjects(result, "slot");
  }, [data]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} pt={3}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs>
            <Typography variant="h3">
              {tTransactions("admin-panel-transactions:title")}
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
                    {tTransactions("admin-panel-transactions:table.column1")}
                  </TableSortCellWrapper>
                  <TableCell style={{ width: 200 }}>
                    {tTransactions("admin-panel-transactions:table.column2")}
                  </TableCell>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="is_vote"
                    handleRequestSort={handleRequestSort}
                  >
                    {tTransactions("admin-panel-transactions:table.column3")}
                  </TableSortCellWrapper>

                  <TableCell style={{ width: 80 }}>
                    {tTransactions("admin-panel-transactions:table.column4")}
                  </TableCell>
                  <TableCell style={{ width: 130 }}>
                    {tTransactions("admin-panel-transactions:table.column5")}
                  </TableCell>
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
            itemContent={(index, transaction) => (
              <>
                <TableCell style={{ width: 50 }}></TableCell>
                <TableCell style={{ width: 100 }}>
                  {transaction?.slot}
                </TableCell>
                <TableCell style={{ width: 100 }}>
                  {transaction?.is_vote ? "✅" : "❌"}
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  {transaction?.signature?.slice(0, 6) +
                    "..." +
                    transaction?.signature?.slice(-6)}
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  {JSON.stringify(transaction?.transaction)}
                </TableCell>
                <TableCell>{JSON.stringify(transaction?.meta)}</TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

// export default withPageRequiredAuth(Transactions, { roles: [RoleEnum.ADMIN] });
export default Transactions;
