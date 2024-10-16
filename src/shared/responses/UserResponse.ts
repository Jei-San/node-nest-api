import { ApiProperty } from '@nestjs/swagger';

import BaseResponse from '@shared/responses/baseResponses/BaseResponse';

export default class UserResponse extends BaseResponse {
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
    description: 'User profile picture',
    default: '/user/image',
  })
  profilePicture: string = '';

  @ApiProperty({
    description: 'User created at',
    default: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'User disabled at',
    default: new Date(),
  })
  disabledAt?: Date;
}
