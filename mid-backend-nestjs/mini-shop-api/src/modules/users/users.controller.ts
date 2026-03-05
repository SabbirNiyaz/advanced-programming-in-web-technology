import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Base route: /users
export class UserController {
  constructor(private readonly userService: UserService) { }

  //! GET /users - get all users
  @Get()
  async getAllUsers(): Promise<UserEntity[] | null> {
    return this.userService.findAllUsers();
  }

  //! GET /users/:id - get a user by ID
  @Get(':id')
  async getOneUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | null> {
    return this.userService.findOneUser(id);
  }

  //! POST /users - create a new user
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(userData);
  }
}