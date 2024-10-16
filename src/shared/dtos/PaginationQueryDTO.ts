import { ApiProperty } from '@nestjs/swagger';

export default class PaginationQueryDTO {
  @ApiProperty({
    description: 'Page limit',
    default: 10,
  })
  pageSize: number = 10;

  @ApiProperty({
    description: 'Page index',
    default: 1,
  })
  page: number = 1;

  @ApiProperty({
    description: 'Search by name',
    default: 'John doe',
    required: false,
  })
  search?: string;
}
