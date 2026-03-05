import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    ) { }

    async findAllUsers(): Promise<UserEntity[] | null> {
        const users = await this.userRepo.find();
        if (users.length === 0) {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND);
        }
        const userData = users.map(({ password, createdAt, updatedAt, ...userData }) => userData);
        return userData as UserEntity[]; // Type assertion to exclude password from the returned user objects
    }

    async findOneUser(id: number): Promise<UserEntity | null> {
        const user = await this.userRepo.findOneBy({ id });
        console.log(`Fetched user with ID ${id}:`, user);
        if (user === null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const { password, createdAt, updatedAt, ...userData } = user;
        return userData as UserEntity; // Type assertion to exclude password from the returned user object
    }

    async createUser(userData: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepo.create(userData);
        try {
            const savedUser = await this.userRepo.save(user);
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw new HttpException(`Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
