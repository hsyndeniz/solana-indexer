import { Role } from "@/services/api/types/role";
import { SortEnum } from "@/services/api/types/sort-type";
import { BlockMeta } from "@/services/api/types/user";

export type BlockFilterType = {
  roles?: Role[];
};

export type BlockSortType = {
  orderBy: keyof BlockMeta;
  order: SortEnum;
};
