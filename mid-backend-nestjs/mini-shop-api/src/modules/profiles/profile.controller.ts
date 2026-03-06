import { Controller, Get, Post, Param, Body, ParseIntPipe, Put, Delete, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles') // Base route: /profiles
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    //! POST /profiles - create a new profile
    @Post()
    async createProfile(@Body() profileData: CreateProfileDto): Promise<ProfileEntity> {
        return this.profileService.createProfile(profileData);
    }
    //! GET /profiles - get all profiles
    @Get()
    async getAllProfiles(): Promise<ProfileEntity[]> {
        return this.profileService.getAllProfiles();
    }
}