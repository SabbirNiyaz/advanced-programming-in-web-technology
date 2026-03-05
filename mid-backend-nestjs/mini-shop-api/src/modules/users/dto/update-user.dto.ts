import { IsEmail, IsNotEmpty, MinLength, IsString, Matches, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
        message: 'Password must contain at least one letter and one number',
    })
    password?: string;
}