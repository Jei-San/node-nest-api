import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';

import { User } from '@core/schemas/User';

import PaginationQueryDTO from '@shared/dtos/PaginationQueryDTO';
import UserUpsertDTO from '@shared/dtos/upsertDtos/UserUpsertDTO';

@Injectable()
export default class MongooseUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async upsert(userUpsertDTO: UserUpsertDTO): Promise<User> {
    return await this.userModel
      .findOneAndUpdate(
        { _id: userUpsertDTO.id },
        { _id: userUpsertDTO.id, ...userUpsertDTO },
        { upsert: true },
      )
      .exec();
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(userDTO: UserUpsertDTO): Promise<User> {
    return await new this.userModel(userDTO).save();
  }

  async update(userDTO: UserUpsertDTO): Promise<boolean> {
    const user: UpdateWriteOpResult = await this.userModel
      .findById(userDTO.id)
      .updateOne({
        $set: {
          ...userDTO,
          updatedAt: new Date(),
        },
      })
      .exec();

    return user.modifiedCount > 0;
  }

  async paginatedUsers(
    paginationQueryDTO: PaginationQueryDTO,
  ): Promise<Array<User>> {
    return await this.userModel
      .find()
      .limit(paginationQueryDTO.pageSize)
      .skip(paginationQueryDTO.pageSize * paginationQueryDTO.page)
      .sort({ name: 1 })
      .exec();
  }

  async countUsers(): Promise<number> {
    return await this.userModel.find().countDocuments().exec();
  }

  async updatePassword(userId: string, password: string): Promise<boolean> {
    const user: UpdateWriteOpResult = await this.userModel
      .findById(userId)
      .updateOne({
        $set: {
          password,
        },
      })
      .exec();

    return user.modifiedCount > 0;
  }
}
