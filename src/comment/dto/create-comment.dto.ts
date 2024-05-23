import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCommentDto {
    @ApiProperty({
        description: 'Comment text.',
        example: 'My Comment Text',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly text: string

    @ApiProperty({
        description: 'Card id to which the comment belongs.',
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    readonly cardId: number
}
