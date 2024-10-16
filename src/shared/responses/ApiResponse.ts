import { ApiProperty } from '@nestjs/swagger';

export default class ApiResponse<T> {
  @ApiProperty({
    description: 'Api success reponse',
    default: true,
  })
  success: boolean = false;

  @ApiProperty({
    description: 'Api message response',
    default: 'Api response message!',
  })
  message: string = '';

  @ApiProperty({
    description: 'Api data reponse',
  })
  data?: T;
}
