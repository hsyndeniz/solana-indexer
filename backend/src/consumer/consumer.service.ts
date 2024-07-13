import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Account, BlockMeta, Transaction } from './domain/types';
import { Prisma, Slot } from '@prisma/client';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private prisma: PrismaService) {}

  saveSlot(data: Slot) {
    return this.prisma.slot.upsert({ where: { slot: data.slot }, create: data, update: data });
  }

  saveBlock(data: BlockMeta) {
    return this.prisma.blockMeta.upsert({
      where: { slot: data.slot },
      create: {
        ...data,
        block_time: new Date(data.block_time.timestamp),
        block_height: data.block_height.block_height,
        rewards: data.rewards.rewards as Prisma.JsonArray,
      },
      update: {
        ...data,
        block_time: new Date(data.block_time.timestamp),
        block_height: data.block_height.block_height,
        rewards: data.rewards.rewards as Prisma.JsonArray,
      },
    });
  }

  saveAccount(account: Account, slot: number) {
    return this.prisma.account.upsert({
      where: { pubkey: account.pubkey },
      create: {
        pubkey: account.pubkey,
        lamport: account.lamports,
        slot,
        executable: account.executable,
        rent_epoch: account.rent_epoch.toString(),
        data: account.data,
        write_version: account.write_version,
        txn_signature: account.txn_signature,
        owner: account.owner,
      },
      update: {
        lamport: account.lamports,
        slot,
        executable: account.executable,
        rent_epoch: account.rent_epoch.toString(),
        data: account.data,
        write_version: account.write_version,
        txn_signature: account.txn_signature,
        owner: account.owner,
      },
    });
  }

  saveTransaction(transaction: Transaction, slot: bigint) {
    return this.prisma.transaction.create({
      data: {
        signature: transaction.signature,
        is_vote: transaction.is_vote,
        transaction: transaction.transaction as any,
        meta: transaction.meta as any,
        index: transaction.index,
        slot,
      },
    });
  }
}
