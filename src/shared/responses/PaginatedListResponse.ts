import { ApiProperty } from '@nestjs/swagger';

export default class PaginatedListResponse<T> {
  @ApiProperty({
    description: 'Page',
    default: 1,
  })
  page: number = 0;

  @ApiProperty({
    description: 'Total items',
    default: 100,
  })
  totalCount: number = 0;

  @ApiProperty({
    description: 'Paginated data',
    default: new Array<T>(),
  })
  data: Array<T> | null | undefined;
}
