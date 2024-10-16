import { ApiProperty } from '@nestjs/swagger';

export default class BaseResponse {
  @ApiProperty({
    description: 'Id',
    default: '123123123',
  })
  id?: string;

  @ApiProperty({
    description: 'Nype',
    default: 'John Doe',
  })
  name?: string = '';

  @ApiProperty({
    description: 'Created by',
    default: 'Johndoe@johndoe.com',
  })
  createdBy?: string;
}
