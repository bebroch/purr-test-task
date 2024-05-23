import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        description: 'Email of the user.',
        example: 'email@example.com',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({
        description: 'Password of the user.',
        example: 'password111',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string
}
