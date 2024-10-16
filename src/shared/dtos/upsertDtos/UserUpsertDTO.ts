import { ApiProperty } from '@nestjs/swagger';

import BaseUserDTO from '@shared/dtos/baseDtos/BaseUserDTO';

export default class UserUpsertDTO extends BaseUserDTO {
  @ApiProperty({
    description: 'User profile picture',
    default: '/user/image',
  })
  profilePicture?: string;

  @ApiProperty({
    description: 'User recovery code',
    default: '123123123',
  })
  recoveryCode?: string = '';
}
