import { IsNotEmpty, IsString, IsNumber } from "class-validator";


export class CreateProfileDto {
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    phone: string;

    @IsNotEmpty({ message: 'Address is required' })
    @IsString({ message: 'Address must be a string' })
    address: string;

    @IsNotEmpty({ message: 'User ID is required' })
    @IsNumber({}, { message: 'User ID must be a number' })
    userId: number;
}