import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
    ) { }
    //! Create a new profile
    async createProfile(profileData: CreateProfileDto): Promise<ProfileEntity> {
        const user = await this.userRepo.findOne({
            where: { id: profileData.userId },
            relations: ['profile'],
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } if (user.profile) {
            throw new HttpException('User already has a profile', HttpStatus.BAD_REQUEST);
        }
        const newProfile = this.profileRepo.create({
            phone: profileData.phone,
            address: profileData.address,
            user: user
        });
        return await this.profileRepo.save(newProfile);
    }
    //! Get all profiles
    async getAllProfiles(): Promise<ProfileEntity[]> {
        try {
            return await this.profileRepo.find({
                relations: ['user'],
                select: {
                    id: true,
                    phone: true,
                    address: true,
                    user: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
            throw new HttpException(`Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}