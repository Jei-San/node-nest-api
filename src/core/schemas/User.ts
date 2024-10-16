import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { BaseNameSchema } from '@core/schemas/BaseNameSchema';

export type UserDocument = HydratedDocument<User>;

@Schema({ toJSON: { virtuals: true } })
export class User extends BaseNameSchema {
  @Prop({ required: true })
  status: string = '';

  @Prop({ required: false })
  address: string = '';

  @Prop({ required: true })
  email: string = '';

  @Prop({ required: true })
  phoneNumber: string = '';

  @Prop({ required: true })
  password: string = '';

  @Prop({ required: false })
  profilePicture: string = '';

  @Prop({ required: true })
  recoveryCode: string = '';

  @Prop({ required: false, default: null })
  disabledAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
