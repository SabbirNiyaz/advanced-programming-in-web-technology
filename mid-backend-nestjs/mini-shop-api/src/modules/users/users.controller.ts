import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('users') // Base route: /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users - get all users
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  // GET /users/:id - get a user by ID
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | null> {
    return this.userService.findOne(id);
  }

  // POST /users - create a new user
  @Post()
  async create(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.userService.create(userData);
  }
}