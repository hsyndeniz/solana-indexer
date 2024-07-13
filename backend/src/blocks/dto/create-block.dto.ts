// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

export class CreateBlockDto {
  slot: number;
  blockhash: string;
  rewards: string;
  block_time: string;
  block_height: string;
  parent_slot: number;
  parent_blockhash: string;
  executed_transaction_count: string;
  entries_count: string;
}
