import CreateUserBodyDTO from '@shared/dtos/CreateUserBodyDTO';
import UserUpsertDTO from '@shared/dtos/upsertDtos/UserUpsertDTO';

export const userUpsertDTOFactory = (
  createUserBodyDTO: CreateUserBodyDTO,
  email: string,
  isUpdate: boolean = false,
): UserUpsertDTO => {
  const createdUserDTO: UserUpsertDTO = {
    id: createUserBodyDTO.id ?? '',
    name: createUserBodyDTO.name,
    status: createUserBodyDTO.status,
    address: createUserBodyDTO.address,
    email: createUserBodyDTO.email,
    recoveryCode: createUserBodyDTO.recoveryCode,
    password: createUserBodyDTO.password,
    phoneNumber: createUserBodyDTO.phoneNumber,
    updatedBy: email,
  };

  if (!isUpdate) {
    createdUserDTO.createdBy = email;
  }

  return createdUserDTO;
};
