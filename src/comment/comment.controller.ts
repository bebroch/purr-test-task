import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { UserGuard } from '../auth/guards/user/user.guard'
import { DataInterceptor } from '../common/interceptors/array/array.interceptor'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
@UseGuards(UserGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @UseInterceptors(DataInterceptor)
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto)
    }

    @Get()
    @UseInterceptors(DataInterceptor)
    findAll() {
        return this.commentService.findAll()
    }

    @Get(':id')
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentService.update(+id, updateCommentDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id)
    }
}
