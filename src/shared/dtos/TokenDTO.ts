import { ApiProperty } from '@nestjs/swagger';

export default class TokenDTO {
  @ApiProperty({
    description: 'User id',
    default: '123123123',
  })
  userId: string = '';

  @ApiProperty({
    description: 'User email',
    default: 'johndoe@johndoe.com',
  })
  email: string = '';
}
