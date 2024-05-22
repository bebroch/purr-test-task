import { ApiProperty } from '@nestjs/swagger'
import { CreateCommentDto } from './create-comment.dto'

export class UpdateCommentDto implements Omit<CreateCommentDto, 'cardId'> {
    @ApiProperty({
        description: 'Comment text.',
        example: 'My Comment Text',
        required: false,
    })
    readonly text: string
}
