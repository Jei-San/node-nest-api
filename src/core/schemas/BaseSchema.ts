import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  id?: string;

  @Prop({ required: true, default: new Date() })
  createdAt: Date = new Date();

  @Prop({ required: false, default: null })
  updatedAt?: Date;

  @Prop({ required: false, default: null })
  deletedAt?: Date;
}
