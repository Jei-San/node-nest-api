import { ApiProperty } from '@nestjs/swagger';

export default class AuthDTO {
  @ApiProperty({
    description: 'Sign in email',
    default: 'johndoe@johndoe.com',
  })
  email: string = '';

  @ApiProperty({
    description: 'Sign in password',
    default: '******',
  })
  password: string = '';
}
