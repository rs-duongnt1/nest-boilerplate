import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/shared/services/redis.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUserEntity } from './user.entity';
import { UserRepository } from './user.repository';
@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private redisService: RedisService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const userResult = await this.userRepository.save(user);
    const users: IUserEntity[] = await this.redisService.get<IUserEntity[]>(
      '/api/users',
    );
    users.push(userResult);
    this.redisService.set('/api/users', users);
    return users;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<IUserEntity[]> {
    const users = await this.userRepository.find({
      order: {
        createdAt: 1,
      },
    });
    return users;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async getUser(@Param() params): Promise<IUserEntity> {
    const user = await this.userRepository.findOne(params.id);
    if (!user) {
      throw new NotFoundException('User not exists');
    }
    return user;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(
    @Param() params,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteUser(@Param() params): Promise<DeleteResult> {
    return this.userRepository.delete(params.id);
  }
}
