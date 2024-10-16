import { ApiProperty } from '@nestjs/swagger';

export default class ForgotPasswordDTO {
  @ApiProperty({
    description: 'User email',
    default: 'johndoe@johndoe.com',
  })
  email: string = '';
}
