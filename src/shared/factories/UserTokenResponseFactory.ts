import UserTokenResponse from '@shared/responses/UserTokenResponse';

export const userTokenResponseFactory = (
  token: string,
  refreshToken: string,
): UserTokenResponse => {
  return {
    accessToken: token,
    refreshToken,
    expiresIn: 3600,
  };
};
