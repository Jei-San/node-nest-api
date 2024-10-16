import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import UserUpsertDTO from '@shared/dtos/upsertDtos/UserUpsertDTO';
import UserDTO from '@shared/dtos/UserDTO';
import TokenDTO from '@shared/dtos/TokenDTO';
import CreateUserBodyDTO from '@shared/dtos/CreateUserBodyDTO';
import PaginationQueryDTO from '@shared/dtos/PaginationQueryDTO';
import ApiResponse from '@shared/responses/ApiResponse';
import UserResponse from '@shared/responses/UserResponse';
import PaginatedListResponse from '@shared/responses/PaginatedListResponse';
import SharedResources from '@shared/constants/SharedResources';
import { userResponseFactory } from '@shared/factories/UserResponseFactory';
import { userUpsertDTOFactory } from '@shared/factories/UserUpsertDTOFactory';
import { REPOSITORIES } from '@shared/constants/Repositories';

import MongooseUserRepository from '@adapters/repositories/UserRepository';

import AzureBlobService from '@core/externals/AzureBlobService';
import { User } from '@core/schemas/User';
import { generateRecoveryCode } from '@utils/GenerateRecoveryCode';
import { bcryptPassword } from '@utils/BcryptPassword';

@Injectable()
export default class UserService {
  constructor(
    @Inject(REPOSITORIES.UserRepository)
    private readonly userRepository: MongooseUserRepository,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  private userActivation(status: string) {
    if (status === SharedResources.UserInactiveStatus) return new Date();
    else return null;
  }

  async create(
    createUserBodyDTO: CreateUserBodyDTO,
    email: string,
  ): Promise<ApiResponse<UserResponse>> {
    createUserBodyDTO.password = await bcryptPassword(
      createUserBodyDTO.password,
    );
    createUserBodyDTO.recoveryCode = generateRecoveryCode();

    const userUpsertDTO: UserUpsertDTO = userUpsertDTOFactory(
      createUserBodyDTO,
      email,
      false,
    );

    if (createUserBodyDTO.profilePicture.size > 0) {
      userUpsertDTO.profilePicture =
        await this.azureBlobService.uploadProfilePicture(
          createUserBodyDTO.profilePicture,
          createUserBodyDTO.id,
        );
    }

    userUpsertDTO.disabledAt = this.userActivation(userUpsertDTO.status);

    const user: User = await this.userRepository.create(userUpsertDTO);

    if (!user) throw new BadRequestException('Failed to create user');

    return {
      success: true,
      message: 'Successfully created user',
      data: userResponseFactory(user),
    };
  }

  async findById(id: string): Promise<ApiResponse<UserResponse>> {
    const user: User = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException(`User id ${id} not found`);

    return {
      success: true,
      message: 'Successfully retrieved user',
      data: userResponseFactory(user),
    };
  }

  async updateSelf(
    createUserBodyDTO: CreateUserBodyDTO,
    tokenDTO: TokenDTO,
  ): Promise<ApiResponse<boolean>> {
    createUserBodyDTO.id = tokenDTO.userId;
    const userUpsertDTO: UserUpsertDTO = userUpsertDTOFactory(
      createUserBodyDTO,
      tokenDTO.email,
      true,
    );

    if (createUserBodyDTO.password) {
      userUpsertDTO.password = await bcryptPassword(createUserBodyDTO.password);
    }

    if (createUserBodyDTO.profilePicture.size > 0) {
      userUpsertDTO.profilePicture =
        await this.azureBlobService.uploadProfilePicture(
          createUserBodyDTO.profilePicture,
          createUserBodyDTO.id,
        );
    }

    userUpsertDTO.disabledAt = this.userActivation(userUpsertDTO.status);

    const updated: boolean = await this.userRepository.update(userUpsertDTO);

    return {
      success: updated,
      message: updated ? 'Successfully updated user' : 'Failed to update user',
      data: updated,
    };
  }

  async update(
    createUserBodyDTO: CreateUserBodyDTO,
    tokenDTO: TokenDTO,
  ): Promise<ApiResponse<boolean>> {
    const userUpsertDTO: UserUpsertDTO = userUpsertDTOFactory(
      createUserBodyDTO,
      tokenDTO.email,
      true,
    );

    if (createUserBodyDTO.password) {
      userUpsertDTO.password = await bcryptPassword(createUserBodyDTO.password);
    }

    if (createUserBodyDTO.profilePicture.size > 0) {
      userUpsertDTO.profilePicture =
        await this.azureBlobService.uploadProfilePicture(
          createUserBodyDTO.profilePicture,
          createUserBodyDTO.id,
        );
    }

    userUpsertDTO.disabledAt = this.userActivation(userUpsertDTO.status);

    const updated: boolean = await this.userRepository.update(userUpsertDTO);

    return {
      success: updated,
      message: updated ? 'Successfully updated user' : 'Failed to update user',
      data: updated,
    };
  }

  async paginatedUsers(
    paginationQueryDTO: PaginationQueryDTO,
  ): Promise<ApiResponse<PaginatedListResponse<UserResponse>>> {
    const users: Array<User> =
      await this.userRepository.paginatedUsers(paginationQueryDTO);
    const totalCount: number = await this.userRepository.countUsers();

    if (!users) throw new BadRequestException('Failed to retrieve users');

    return {
      success: true,
      message: 'Successfully retrieved users',
      data: {
        page: paginationQueryDTO.page,
        totalCount,
        data: users.map((user: UserDTO) => userResponseFactory(user)),
      },
    };
  }
}
