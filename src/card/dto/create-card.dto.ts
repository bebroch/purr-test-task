import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    columnId: number
}
