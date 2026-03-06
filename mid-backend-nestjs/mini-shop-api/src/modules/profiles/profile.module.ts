import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileEntity } from './entities/profile.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule { }