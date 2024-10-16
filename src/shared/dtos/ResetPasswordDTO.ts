import { ApiProperty } from '@nestjs/swagger';

export default class ResetPasswordDTO {
  @ApiProperty({
    description: 'User email',
    default: 'johndoe@johndoe.com',
  })
  email: string = '';

  @ApiProperty({
    description: 'User reset code',
    default: '123123123',
  })
  resetCode: string = '';

  @ApiProperty({
    description: 'User new password',
    default: '*******',
  })
  newPassword: string = '';
}
