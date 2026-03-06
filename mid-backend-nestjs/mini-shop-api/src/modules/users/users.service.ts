import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    ) { }
    //! Get all users
    async findAllUsers(): Promise<UserEntity[] | null> {
        const users = await this.userRepo.find({
            relations: ['profile'],
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    id: true,
                    phone: true,
                    address: true,
                },
            },
            order: {
                id: 'ASC',
            },
        });
        if (users.length === 0) {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND);
        } return users;
    }
    //! Get a user by ID
    async findOneUser(id: number): Promise<UserEntity | null> {
        const user = await this.userRepo.findOne({
            where: { id },
            relations: ['profile'],
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    id: true,
                    phone: true,
                    address: true,
                },
            }
        });
        // console.log(`Fetched user with ID ${id}:`, user);
        if (user === null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
    //! Create a new user
    async createUser(userData: CreateUserDto): Promise<UserEntity | null> {
        const user = this.userRepo.create(userData);
        try {
            const savedUser = await this.userRepo.save(user);

            const { password, updatedAt, ...userData } = savedUser;
            return userData as UserEntity; // Type assertion to exclude password from the returned user object
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new HttpException(`Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //! Update a user by ID
    async updateUser(id: number, userData: UpdateUserDto): Promise<Partial<UserEntity>> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        try {
            Object.assign(user, userData);
            const updatedUser = await this.userRepo.save(user);
            const { password, createdAt, ...updatedData } = updatedUser;
            return updatedData; // Return the updated user data without the password and createdAt fields

        } catch (error) {
            console.error('Error updating user:', error.message);
            throw new HttpException(`Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //! Delete a user by ID
    async deleteUser(id: number): Promise<any> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        await this.userRepo.delete(id);
        return {
            success: true,
            message: `User with ID ${id} has been deleted`,
        };
    }
    //! Search users by name or email or both
    async searchUsers(name?: string, email?: string): Promise<UserEntity[]> {
        // console.log(`Searching users with name: ${name}, email: ${email}`);
        if (!name && !email) {
            throw new HttpException('Please provide at least a name or an email to search', HttpStatus.BAD_REQUEST);
        }
        const searchedUsers = await this.userRepo.find({
            where: [
                { name: ILike(`%${name}%`) },
                { email: ILike(`%${email}%`) },
            ],
        });
        return searchedUsers;
    }
}
