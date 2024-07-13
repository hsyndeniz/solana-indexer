import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Block } from '../../domain/block';

export abstract class BlockRepository {
  abstract findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<Block[]>;

  abstract findById(slot: Block['slot']): Promise<NullableType<Block>>;
}
