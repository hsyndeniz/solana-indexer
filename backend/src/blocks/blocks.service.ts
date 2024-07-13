import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PrismaService } from '../prisma/prisma.service';
import { BlockMeta } from '@prisma/client';

@Injectable()
export class BlocksService {
  constructor(private readonly prisma: PrismaService) {
    // @ts-expect-error BigInt is not defined in the global scope
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };
  }

  findAllWithPagination({ paginationOptions }: { paginationOptions: IPaginationOptions }) {
    return this.prisma.blockMeta.findMany({
      take: paginationOptions.limit,
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
    });
  }

  findOne(slot: BlockMeta['slot']) {
    return this.prisma.blockMeta.findUnique({ where: { slot } });
  }
}
