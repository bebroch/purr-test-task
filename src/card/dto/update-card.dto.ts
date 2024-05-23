import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { CreateCardDto } from './create-card.dto'

export class UpdateCardDto implements Omit<CreateCardDto, 'columnId'> {
    @ApiPropertyOptional({
        description: 'Title of the card.',
        example: 'My Title',
    })
    @IsString()
    @IsOptional()
    readonly title: string

    @ApiPropertyOptional({
        description: 'Description of the card.',
        example: 'My Description',
    })
    @IsString()
    @IsOptional()
    readonly description: string
}
