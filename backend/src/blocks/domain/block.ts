import { ApiProperty } from '@nestjs/swagger';

export class Block {
  @ApiProperty({
    type: Number,
  })
  slot: number;

  @ApiProperty({
    type: String,
  })
  blockhash: string;

  @ApiProperty()
  rewards: string;

  @ApiProperty()
  block_time: string;

  @ApiProperty()
  block_height: string;

  @ApiProperty()
  parent_slot: number;

  @ApiProperty()
  parent_blockhash: string;

  @ApiProperty()
  executed_transaction_count: string;

  @ApiProperty()
  entries_count: string;
}
