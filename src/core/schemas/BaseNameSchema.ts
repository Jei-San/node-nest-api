import { Prop } from '@nestjs/mongoose';

import { BaseSchema } from '@core/schemas/BaseSchema';

export class BaseNameSchema extends BaseSchema {
  @Prop({ required: true })
  name: string = '';

  @Prop({ required: true })
  createdBy: string = '';

  @Prop({ required: false, default: null })
  updatedBy?: string;
}
