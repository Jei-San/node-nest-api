export const decodeBase64String = (stringToConvert: string): string => {
  return Buffer.from(
    stringToConvert,
    process.env.BYTE_TYPE as BufferEncoding,
  ).toString(process.env.STRING_TYPE as BufferEncoding);
};
