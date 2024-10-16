import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { APP_SCHEMAS } from './AppSchemas';

export const APP_MODULES = [
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGODB_CONNECTIONSTRING!),
  MongooseModule.forFeature(APP_SCHEMAS),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION },
  }),
  NestjsFormDataModule.config({ storage: MemoryStoredFile }),
];
