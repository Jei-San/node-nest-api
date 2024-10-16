import { ApiProperty } from '@nestjs/swagger';

import BaseDTO from '@shared/dtos/baseDtos/BaseDTO';

export default class BaseUserDTO extends BaseDTO {
  @ApiProperty({
    description: 'User status',
    default: 'Active',
  })
  status: string = '';

  @ApiProperty({
    description: 'User address',
    default: 'Test St 123',
  })
  address: string = '';

  @ApiProperty({
    description: 'User email',
    default: 'johndoe@johndoe.com',
  })
  email: string = '';

  @ApiProperty({
    description: 'User phone number',
    default: '12345891',
  })
  phoneNumber: string = '';

  @ApiProperty({
    description: 'User password',
    default: '******',
  })
  password: string = '';

  @ApiProperty({
    description: 'User updated by',
    default: 'Johndoe@johndoe.com',
  })
  updatedBy?: string;

  @ApiProperty({
    description: 'User disabled at',
    default: new Date(),
  })
  disabledAt?: Date;
}
