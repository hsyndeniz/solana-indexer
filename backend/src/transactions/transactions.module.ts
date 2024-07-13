import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { RelationalTransactionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, RelationalTransactionPersistenceModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService, RelationalTransactionPersistenceModule],
})
export class TransactionsModule {}
