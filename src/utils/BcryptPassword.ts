import bcryptjs from 'bcryptjs';

export const bcryptPassword = async (password: string): Promise<string> => {
  const salt: string = await bcryptjs.genSalt(+process.env.SALT_ROUNDS!);
  return bcryptjs.hashSync(password, salt);
};
