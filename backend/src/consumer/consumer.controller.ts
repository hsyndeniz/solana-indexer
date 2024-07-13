import { EventPattern } from '@nestjs/microservices';
import { Controller, Body } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { Account, BlockMeta, Transaction } from './domain/types';
import { Slot } from '@prisma/client';

@Controller({ path: 'consumer', version: '1' })
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('solana.testnet.slot_status')
  slotStatus(@Body() message: { update_oneof: { Slot: Slot } }) {
    return this.consumerService.saveSlot(message.update_oneof.Slot);
  }

  @EventPattern('solana.testnet.block_metadata')
  blockMetadata(@Body() message: { update_oneof: { BlockMeta: BlockMeta } }) {
    return this.consumerService.saveBlock(message.update_oneof.BlockMeta);
  }

  @EventPattern('solana.testnet.account_updates')
  accountUpdates(@Body() message: { update_oneof: { Account: { account: Account; slot: number } } }) {
    return this.consumerService.saveAccount(message.update_oneof.Account.account, message.update_oneof.Account.slot);
  }

  @EventPattern('solana.testnet.transaction')
  transaction(@Body() message: { update_oneof: { Transaction: { slot: bigint; transaction: Transaction } } }) {
    return this.consumerService.saveTransaction(
      message.update_oneof.Transaction.transaction,
      message.update_oneof.Transaction.slot,
    );
  }
}
