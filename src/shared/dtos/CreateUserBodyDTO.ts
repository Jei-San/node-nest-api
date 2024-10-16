import { ApiProperty } from '@nestjs/swagger';
import { MemoryStoredFile } from 'nestjs-form-data';

import BaseUserDTO from '@shared/dtos/baseDtos/BaseUserDTO';

export default class CreateUserBodyDTO extends BaseUserDTO {
  @ApiProperty({
    description: 'User recovery code',
    default: '123123123',
  })
  recoveryCode?: string = '';

  @ApiProperty({
    description: 'User profile picture',
    default: '/user/image',
  })
  profilePicture: MemoryStoredFile;

  @ApiProperty({
    description: 'User country',
    default: '123123123',
  })
  countryId: string = '';

  @ApiProperty({
    description: 'User state',
    default: '123123123',
  })
  stateId: string = '';

  @ApiProperty({
    description: 'User city',
    default: '123123123',
  })
  cityId: string = '';

  @ApiProperty({
    description: 'User created by',
    default: 'Johndoe@johndoe.com',
  })
  createdBy?: string;

  @ApiProperty({
    description: 'User created by',
    default: '12312312312, 123123123',
  })
  roles: string = '';
}
