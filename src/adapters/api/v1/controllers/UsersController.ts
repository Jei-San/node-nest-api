import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

import UserService from '@core/services/UserService';

import ApiResponse from '@shared/responses/ApiResponse';
import UserResponse from '@shared/responses/UserResponse';
import HttpExceptionResponse from '@shared/responses/HttpExceptionResponse';
import PaginatedListResponse from '@shared/responses/PaginatedListResponse';
import CreateUserBodyDTO from '@shared/dtos/CreateUserBodyDTO';
import PaginationQueryDTO from '@shared/dtos/PaginationQueryDTO';

@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOkResponse({
    description: 'Successfully retrieved user',
    type: ApiResponse<UserResponse>,
  })
  @ApiBadRequestResponse({
    description: 'User with id ${id} not found',
    type: HttpExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation',
    type: HttpExceptionResponse,
  })
  async findByTokenUserId(@Req() req: any): Promise<ApiResponse<UserResponse>> {
    return await this.userService.findById(req.user.userId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved user',
    type: ApiResponse<UserResponse>,
  })
  @ApiBadRequestResponse({
    description: 'User with id ${id} not found',
    type: HttpExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation',
    type: HttpExceptionResponse,
  })
  async findById(@Param('id') id: string): Promise<ApiResponse<UserResponse>> {
    return await this.userService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created user.',
    type: ApiResponse<UserResponse>,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation',
    type: HttpExceptionResponse,
  })
  @FormDataRequest({ storage: MemoryStoredFile })
  async createUserAsAdmin(
    @Req() req: any,
    @Body() user: CreateUserBodyDTO,
  ): Promise<ApiResponse<UserResponse>> {
    return await this.userService.create(user, req.user.email);
  }

  @Put()
  @ApiOkResponse({
    description: 'Successfully updated user.',
    type: ApiResponse<boolean>,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation',
    type: HttpExceptionResponse,
  })
  @FormDataRequest({ storage: MemoryStoredFile })
  async update(
    @Req() req: any,
    @Body() createUserBodyDTO: CreateUserBodyDTO,
  ): Promise<ApiResponse<boolean>> {
    return await this.userService.updateSelf(createUserBodyDTO, req.user);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Successfully updated user.',
    type: ApiResponse<boolean>,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation',
    type: HttpExceptionResponse,
  })
  @FormDataRequest({ storage: MemoryStoredFile })
  async updateUserAsAdmin(
    @Req() req: any,
    @Body() createUserBodyDTO: CreateUserBodyDTO,
    @Param('id') userId: string,
  ): Promise<ApiResponse<boolean>> {
    createUserBodyDTO.id = userId;
    return await this.userService.update(createUserBodyDTO, req.user);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Successfully retrieved users',
    type: ApiResponse<PaginatedListResponse<UserResponse>>,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorized fulfill operation.',
    type: HttpExceptionResponse,
  })
  async paginatedUsers(
    @Param() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<ApiResponse<PaginatedListResponse<UserResponse>>> {
    return await this.userService.paginatedUsers(paginationQueryDTO);
  }
}
