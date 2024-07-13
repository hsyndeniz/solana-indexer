import { Block } from '../../../../domain/block';
import { BlockEntity } from '../entities/block.entity';

export class BlockMapper {
  static toDomain(raw: BlockEntity): Block {
    const domainEntity = new Block();
    domainEntity.slot = raw.slot;
    domainEntity.blockhash = raw.blockhash;
    domainEntity.rewards = raw.rewards;
    domainEntity.block_time = raw.block_time;
    domainEntity.block_height = raw.block_height;
    domainEntity.parent_slot = raw.parent_slot;
    domainEntity.parent_blockhash = raw.parent_blockhash;
    domainEntity.executed_transaction_count = raw.executed_transaction_count;
    domainEntity.entries_count = raw.entries_count;

    return domainEntity;
  }

  static toPersistence(domainEntity: Block): BlockEntity {
    const persistenceEntity = new BlockEntity();
    if (domainEntity.slot) {
      persistenceEntity.slot = domainEntity.slot;
    }
    persistenceEntity.blockhash = domainEntity.blockhash;
    persistenceEntity.rewards = domainEntity.rewards;
    persistenceEntity.block_time = domainEntity.block_time;
    persistenceEntity.block_height = domainEntity.block_height;
    persistenceEntity.parent_slot = domainEntity.parent_slot;
    persistenceEntity.parent_blockhash = domainEntity.parent_blockhash;
    persistenceEntity.executed_transaction_count = domainEntity.executed_transaction_count;
    persistenceEntity.entries_count = domainEntity.entries_count;

    return persistenceEntity;
  }
}
