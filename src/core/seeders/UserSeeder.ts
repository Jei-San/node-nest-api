import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { REPOSITORIES } from '@shared/constants/Repositories';
import SharedResources from '@shared/constants/SharedResources';

import MongooseUserRepository from '@adapters/repositories/UserRepository';
import { bcryptPassword } from '@utils/BcryptPassword';

import { User } from '@core/schemas/User';

@Injectable()
export default class UserSeeder implements OnModuleInit {
  constructor(
    @Inject(REPOSITORIES.UserRepository)
    private readonly userRepository: MongooseUserRepository,
  ) {}

  async onModuleInit() {
    const user: User = await this.userRepository.findById(
      SharedResources.UserId,
    );

    if (!user)
      await this.userRepository.upsert({
        id: SharedResources.UserId,
        name: SharedResources.UserName,
        createdBy: SharedResources.CreatedByServer,
        status: SharedResources.UserActiveStatus,
        address: SharedResources.UserAddress,
        email: SharedResources.UserEmail,
        phoneNumber: SharedResources.UserPhoneNumber,
        password: await bcryptPassword(SharedResources.UserPassword),
      });
  }
}
