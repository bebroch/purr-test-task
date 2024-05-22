import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCardDto {
    @ApiProperty({
        description: 'Title of the card.',
        example: 'My Title',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({
        description: 'Description of the card.',
        example: 'My Description',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({
        description: 'ID columns where we want to create a card.',
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    readonly columnId: number
}
