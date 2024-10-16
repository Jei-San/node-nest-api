import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';

import { User } from '@core/schemas/User';
import MailService from '@core/externals/MailService';

import AuthDTO from '@shared/dtos/AuthDTO';
import ApiResponse from '@shared/responses/ApiResponse';
import UserTokenResponse from '@shared/responses/UserTokenResponse';
import { userTokenResponseFactory } from '@shared/factories/UserTokenResponseFactory';
import { REPOSITORIES } from '@shared/constants/Repositories';
import ResetPasswordDTO from '@shared/dtos/ResetPasswordDTO';

import MongooseUserRepository from '@adapters/repositories/UserRepository';
import { decodeBase64String } from '@utils/DecodeBase64String';
import { encodeBase64String } from '@utils/EncodeBase64String';
import { emailRecoveryTemplate } from '@utils/templates/EmailRecoveryTemplate';
import { bcryptPassword } from '@utils/BcryptPassword';

@Injectable()
export default class AuthService {
  constructor(
    @Inject(REPOSITORIES.UserRepository)
    private readonly userRepository: MongooseUserRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(authDTO: AuthDTO): Promise<ApiResponse<UserTokenResponse>> {
    const user: User = await this.userRepository.findByEmail(authDTO.email);

    if (!user)
      throw new UnauthorizedException('The email/password is incorrect');

    const match: boolean = await bcryptjs.compare(
      authDTO.password,
      user.password,
    );

    if (!match)
      throw new UnauthorizedException('The email/password is incorrect');

    const token: string = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    const refreshToken: string = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    return {
      success: match,
      message: 'Successfully logged in',
      data: userTokenResponseFactory(token, refreshToken),
    };
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    const user: User = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException(`User email ${email} not found`);

    const recoveryCode: string = decodeBase64String(user.recoveryCode);
    const base64Email: string = encodeBase64String(email);

    await this.mailService.sendEmail(
      [user.email],
      `Recuperacion de contraseña - ${user.name}`,
      emailRecoveryTemplate(recoveryCode, base64Email),
    );

    return {
      success: true,
      message: 'Successfully sent reset password email',
    };
  }

  async resetPassword(
    resetPasswordDTO: ResetPasswordDTO,
  ): Promise<ApiResponse<boolean>> {
    const email: string = resetPasswordDTO.email;

    const user: User = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException(`User email ${email} not found`);

    const recoveryCode = decodeBase64String(user.recoveryCode);

    if (resetPasswordDTO.resetCode !== recoveryCode)
      throw new NotFoundException(
        `User recovery code ${resetPasswordDTO.resetCode} not found`,
      );

    const result: boolean = await this.userRepository.updatePassword(
      user.id,
      await bcryptPassword(resetPasswordDTO.newPassword),
    );

    return {
      success: result,
      message: result
        ? 'Successfully reset password'
        : 'Failed to reset password',
      data: result,
    };
  }
}
