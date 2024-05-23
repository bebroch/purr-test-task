import { ApiPropertyOptional } from '@nestjs/swagger'
import { CreateCommentDto } from './create-comment.dto'

export class UpdateCommentDto implements Omit<CreateCommentDto, 'cardId'> {
    @ApiPropertyOptional({
        description: 'Comment text.',
        example: 'My Comment Text',
    })
    readonly text: string
}
