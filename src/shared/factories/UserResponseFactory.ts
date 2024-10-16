import UserDTO from '@shared/dtos/UserDTO';
import UserResponse from '@shared/responses/UserResponse';

export const userResponseFactory = (userDTO: UserDTO): UserResponse => {
  return {
    id: userDTO.id ?? '',
    name: userDTO.name,
    status: userDTO.status,
    address: userDTO.address,
    email: userDTO.email,
    phoneNumber: userDTO.phoneNumber,
    profilePicture: userDTO.profilePicture,
    createdAt: userDTO.createdAt,
    disabledAt: userDTO.disabledAt,
  };
};
