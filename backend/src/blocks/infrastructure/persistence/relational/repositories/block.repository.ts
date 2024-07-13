import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockEntity } from '../entities/block.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Block } from '../../../../domain/block';
import { BlockRepository } from '../../block.repository';
import { BlockMapper } from '../mappers/block.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BlockRelationalRepository implements BlockRepository {
  constructor(
    @InjectRepository(BlockEntity)
    private readonly blockRepository: Repository<BlockEntity>,
  ) {}

  async create(data: Block): Promise<Block> {
    const persistenceModel = BlockMapper.toPersistence(data);
    const newEntity = await this.blockRepository.save(this.blockRepository.create(persistenceModel));
    return BlockMapper.toDomain(newEntity);
  }

  async findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }): Promise<Block[]> {
    const entities = await this.blockRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => BlockMapper.toDomain(user));
  }

  async findById(slot: Block['slot']): Promise<NullableType<Block>> {
    const entity = await this.blockRepository.findOne({
      where: { slot },
    });

    return entity ? BlockMapper.toDomain(entity) : null;
  }
}
