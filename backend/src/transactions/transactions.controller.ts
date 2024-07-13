import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Transaction } from './domain/transaction';
import { Transaction as TransactionMeta } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTransactionsDto } from './dto/find-all-transactions.dto';

@ApiTags('Transactions')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'transactions',
  version: '1',
})
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Transaction),
  })
  async findAll(@Query() query: FindAllTransactionsDto): Promise<InfinityPaginationResponseDto<TransactionMeta>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.transactionsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':signature')
  @ApiParam({
    name: 'signature',
    type: String,
    required: true,
  })
  findOne(@Param('signature') signature: string) {
    return this.transactionsService.findOne(signature);
  }
}
