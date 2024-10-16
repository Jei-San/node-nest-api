import { ApiProperty } from '@nestjs/swagger';

import BaseUserDTO from '@shared/dtos/baseDtos/BaseUserDTO';

export default class UserDTO extends BaseUserDTO {
  @ApiProperty({
    description: 'User profile picture',
    default: '/user/image',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'User created at',
    default: new Date(),
  })
  createdAt?: Date;
}
