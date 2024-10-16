import { ApiProperty } from '@nestjs/swagger';

export default class BaseDTO {
  @ApiProperty({
    description: 'Id',
    default: '123123123',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Name',
    default: 'John Doe',
  })
  name?: string;

  @ApiProperty({
    description: 'Country created by',
    default: 'Johndoe@johndoe.com',
  })
  createdBy?: string;
}
