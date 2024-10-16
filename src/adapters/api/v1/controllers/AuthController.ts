import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '@config/publicapi';

import AuthService from '@core/services/AuthService';
import UserService from '@core/services/UserService';

import ApiResponse from '@shared/responses/ApiResponse';
import UserTokenResponse from '@shared/responses/UserTokenResponse';
import HttpExceptionResponse from '@shared/responses/HttpExceptionResponse';
import UserResponse from '@shared/responses/UserResponse';
import AuthDTO from '@shared/dtos/AuthDTO';
import ForgotPasswordDTO from '@shared/dtos/ForgotPasswordDTO';
import ResetPasswordDTO from '@shared/dtos/ResetPasswordDTO';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  @ApiOkResponse({
    description: 'Successfully logged in',
    type: ApiResponse<UserTokenResponse>,
  })
  @ApiUnauthorizedResponse({
    description: 'The email/password is incorrect',
    type: HttpExceptionResponse,
  })
  async authenticateUser(
    @Body() user: AuthDTO,
  ): Promise<ApiResponse<UserTokenResponse>> {
    return await this.authService.login(user);
  }

  @Post('verifytoken')
  @ApiOkResponse({
    description: 'Successfully verified user',
    type: ApiResponse<UserResponse>,
  })
  @ApiUnauthorizedResponse({
    description: 'The email/password is incorrect',
    type: HttpExceptionResponse,
  })
  async verifyToken(@Req() req: any): Promise<ApiResponse<UserResponse>> {
    return await this.userService.findById(req.user.userId);
  }

  @Public()
  @Post('forgotpassword')
  @ApiOkResponse({
    description: 'Successfully sent reset password email',
    type: ApiResponse<void>,
  })
  @ApiUnauthorizedResponse({
    description: 'The email is incorrect',
    type: HttpExceptionResponse,
  })
  async forgotpassword(
    @Body() forgotPasswordDTO: ForgotPasswordDTO,
  ): Promise<ApiResponse<void>> {
    return await this.authService.forgotPassword(forgotPasswordDTO.email);
  }

  @Public()
  @Post('resetpassword')
  @ApiOkResponse({
    description: 'Successfully reset password',
    type: ApiResponse<boolean>,
  })
  @ApiUnauthorizedResponse({
    description: 'The email is incorrect',
    type: HttpExceptionResponse,
  })
  async resetPassword(
    @Body() resetPasswordDTO: ResetPasswordDTO,
  ): Promise<ApiResponse<boolean>> {
    return await this.authService.resetPassword(resetPasswordDTO);
  }
}
