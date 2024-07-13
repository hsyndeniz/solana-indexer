import { Role } from "@/services/api/types/role";
import { SortEnum } from "@/services/api/types/sort-type";
import { Transaction } from "@/services/api/types/user";

export type TransactionFilterType = {
  roles?: Role[];
};

export type TransactionSortType = {
  orderBy: keyof Transaction;
  order: SortEnum;
};
