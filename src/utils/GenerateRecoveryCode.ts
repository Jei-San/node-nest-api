import { encodeBase64String } from '@utils/EncodeBase64String';

export const generateRecoveryCode = (): string => {
  const originalString: number = Math.floor(
    10000000 + Math.random() * 90000000,
  );
  const base64String: string = encodeBase64String(originalString.toString());
  return base64String;
};
