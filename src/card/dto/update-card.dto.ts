import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { CreateCardDto } from './create-card.dto'

export class UpdateCardDto implements Omit<CreateCardDto, 'columnId'> {
    @ApiProperty({
        description: 'Title of the card.',
        example: 'My Title',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly title: string

    @ApiProperty({
        description: 'Description of the card.',
        example: 'My Description',
        required: false,
    })
    @IsString()
    @IsOptional()
    readonly description: string
}
