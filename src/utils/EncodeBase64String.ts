export const encodeBase64String = (stringToConvert: string): string => {
  return Buffer.from(stringToConvert).toString(
    process.env.BYTE_TYPE as BufferEncoding,
  );
};
