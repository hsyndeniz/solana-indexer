import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RelationalBlockPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [PrismaModule, RelationalBlockPersistenceModule],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService, RelationalBlockPersistenceModule],
})
export class BlocksModule {}
