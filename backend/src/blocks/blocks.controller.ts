import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BlocksService } from './blocks.service';
import { Block } from './domain/block';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllBlocksDto } from './dto/find-all-blocks.dto';
import { BlockMeta } from '@prisma/client';

@ApiTags('Blocks')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'blocks',
  version: '1',
})
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Block),
  })
  async findAll(@Query() query: FindAllBlocksDto): Promise<InfinityPaginationResponseDto<BlockMeta>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.blocksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':slot')
  @ApiParam({
    name: 'slot',
    type: String,
    required: true,
  })
  findOne(@Param('slot') slot: bigint) {
    return this.blocksService.findOne(slot);
  }
}
