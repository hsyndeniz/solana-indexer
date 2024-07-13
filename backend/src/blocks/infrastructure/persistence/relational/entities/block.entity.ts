import { Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'block',
})
export class BlockEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryColumn()
  slot: number;

  @ApiProperty()
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
