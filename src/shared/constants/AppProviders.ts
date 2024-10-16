import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import UserService from '@core/services/UserService';
import AuthService from '@core/services/AuthService';
import AzureBlobService from '@core/externals/AzureBlobService';
import MailService from '@core/externals/MailService';
import { AuthGuard } from '@core/guards/AuthGuard';
import UserSeeder from '@core/seeders/UserSeeder';

import { REPOSITORIES } from '@shared/constants/Repositories';

import MongooseUserRepository from '@adapters/repositories/UserRepository';
import AzureBlobRepository from '@adapters/externals/AzureBlobRepository';
import MailRepository from '@adapters/externals/MailRepository';

export const APP_PROVIDERS = [
  {
    provide: REPOSITORIES.UserRepository,
    useClass: MongooseUserRepository,
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  MailRepository,
  AzureBlobRepository,
  AzureBlobService,
  MailService,
  UserService,
  JwtService,
  AuthService,
  UserSeeder,
];
