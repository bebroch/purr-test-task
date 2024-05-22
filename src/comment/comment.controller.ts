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
import {
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { AffectOrmInterceptor } from 'src/common/interceptors/affect-orm/affect-orm.interceptor'
import { DataInterceptor } from 'src/common/interceptors/array/array.interceptor'
import { RequestUser } from 'src/common/types/user/request.type'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Controller('comment')
@ApiTags('comment')
@UseGuards(UserGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @ApiOperation({ summary: 'Create Comment.' })
    @ApiBody({ type: CreateCommentDto })
    @ApiResponse({
        status: 201,
        description: 'Comment was created successfully',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @UseInterceptors(DataInterceptor)
    create(
        @Body() createCommentDto: CreateCommentDto,
        @Req() req: RequestUser,
    ) {
        return this.commentService.create(createCommentDto, req.user)
    }

    @Get()
    // TODO Поменять потом документацию, как склею findAll и findByCard (todo ниже)
    @ApiOperation({ summary: 'Get all comments.' })
    @ApiResponse({
        status: 200,
        description: 'Comments were successfully received.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findAll(@Req() req: RequestUser) {
        // TODO нужно сделать поиск по колонкам, типо совместить findAll и findByCard
        return this.commentService.findAll(req.user)
    }

    @Get('col')
    // TODO Поменять потом документацию, как склею findAll и findByColumn (todo выше)
    @ApiOperation({ summary: 'Get comments by card id.' })
    @ApiQuery({ name: 'cardId', type: 'number', required: false })
    @ApiResponse({
        status: 200,
        description: 'Comments were successfully received.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findByCard(
        @Query('cardId', ParseIntPipe) cardId: number,
        @Req() req: RequestUser,
    ) {
        return this.commentService.findByCard(cardId, req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one comment.' })
    @ApiResponse({
        status: 200,
        description: 'Comment was successfully received.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id') id: string, @Req() req: RequestUser) {
        return this.commentService.findOne(+id, req.user)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update one comment.' })
    @ApiResponse({
        status: 200,
        description: 'Comment was successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Req() req: RequestUser,
    ) {
        return this.commentService.update(+id, updateCommentDto, req.user)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete one comment.' })
    @ApiResponse({
        status: 200,
        description: 'Comment was successfully deleted.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    remove(@Param('id') id: string, @Req() req: RequestUser) {
        return this.commentService.remove(+id, req.user)
    }
}
