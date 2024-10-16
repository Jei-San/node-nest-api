import { Module } from '@nestjs/common';

import { APP_MODULES } from './shared/constants/AppModules';
import { APP_PROVIDERS } from './shared/constants/AppProviders';
import { APP_CONTROLLERS } from './shared/constants/AppControllers';

@Module({
  imports: APP_MODULES,
  providers: APP_PROVIDERS,
  controllers: APP_CONTROLLERS,
})
export class AppModule {}
