import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { DataInterceptor } from 'src/common/interceptors/array/array.interceptor'
import { RequestUser } from 'src/common/types/user/request.type'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
@UseGuards(UserGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @UseInterceptors(DataInterceptor)
    create(
        @Body() createCommentDto: CreateCommentDto,
        @Req() req: RequestUser,
    ) {
        return this.commentService.create(createCommentDto, req.user)
    }

    @Get()
    @UseInterceptors(DataInterceptor)
    findAll(@Req() req: RequestUser) {
        return this.commentService.findAll(req.user)
    }

    @Get('col')
    @UseInterceptors(DataInterceptor)
    findByCard(
        @Query('cardId', ParseIntPipe) cardId: number,
        @Req() req: RequestUser,
    ) {
        return this.commentService.findByCard(cardId, req.user)
    }

    @Get(':id')
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id') id: string, @Req() req: RequestUser) {
        return this.commentService.findOne(+id, req.user)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Req() req: RequestUser,
    ) {
        return this.commentService.update(+id, updateCommentDto, req.user)
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestUser) {
        return this.commentService.remove(+id, req.user)
    }
}
