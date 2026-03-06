import { IsOptional, IsString } from "class-validator";


export class UpdateProfileDto {
    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    phone: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    address: string;
}