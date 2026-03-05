import { Controller, Get, Post, Param, Body, ParseIntPipe, Put, Delete, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async createUser(@Body() userData: CreateUserDto): Promise<UserEntity | null> {
    return this.userService.createUser(userData);
  }
  //! PUT /users/:id - update a user by ID
  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateUserDto): Promise<Partial<UserEntity>> {
    return this.userService.updateUser(id, userData);
  }
  //! DELETE /users/:id - delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.userService.deleteUser(id);
  }
  //! POST /users/search - search users by name or email
  @Post('search')
  async searchUsers(
    @Query('name') name: string,
    @Query('email') email: string
  ): Promise<UserEntity[]> {
    return this.userService.searchUsers(name, email);
  }
}