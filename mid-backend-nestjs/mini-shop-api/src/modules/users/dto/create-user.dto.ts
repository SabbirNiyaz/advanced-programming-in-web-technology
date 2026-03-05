import { IsEmail, IsNotEmpty, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
        message: 'Password must contain at least one letter and one number',
    })
    password: string;
}