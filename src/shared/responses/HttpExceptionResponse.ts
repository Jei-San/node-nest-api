import { ApiProperty } from '@nestjs/swagger';

export default class HttpExceptionResponse extends Error {
  @ApiProperty({
    description: 'Request status',
    default: true,
  })
  public status: number;

  @ApiProperty({
    description: 'Error message',
    default: 'Incorrect request parameters',
  })
  public message: string;

  @ApiProperty({
    description: 'Error list',
    default: ['user: user does not exist'],
  })
  public errors: string[] | null | undefined;

  constructor(message: string, status: number, errors?: string[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
