import { Module } from '@nestjs/common';
import { BlockRepository } from '../block.repository';
import { BlockRelationalRepository } from './repositories/block.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockEntity])],
  providers: [
    {
      provide: BlockRepository,
      useClass: BlockRelationalRepository,
    },
  ],
  exports: [BlockRepository],
})
export class RelationalBlockPersistenceModule {}
