import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { AffectOrmInterceptor } from 'src/common/interceptors/affect-orm/affect-orm.interceptor'
import { DataInterceptor } from 'src/common/interceptors/array/array.interceptor'
import { RequestUser } from 'src/common/types/user/request.type'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { UpdateColumnDto } from './dto/update-column.dto'

@Controller('column')
@ApiTags('column')
@UseGuards(UserGuard)
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Post()
    @ApiOperation({ summary: 'Create Column.' })
    @ApiBody({ type: CreateColumnDto })
    @ApiResponse({
        status: 201,
        description: 'Column was created successfully',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @UseInterceptors(DataInterceptor)
    create(@Body() createColumnDto: CreateColumnDto, @Req() req: RequestUser) {
        return this.columnService.create(createColumnDto, req.user)
    }

    @Get()
    @ApiOperation({ summary: 'Get all columns.' })
    @ApiResponse({
        status: 200,
        description: 'columns were successfully received.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findAll(@Req() req: RequestUser) {
        return this.columnService.findAll(req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one column.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of column' })
    @ApiResponse({
        status: 200,
        description: 'Column was successfully received.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestUser) {
        return this.columnService.findOne(id, req.user)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update one column.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of column' })
    @ApiResponse({
        status: 200,
        description: 'Column was successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateColumnDto: UpdateColumnDto,
        @Req() req: RequestUser,
    ) {
        return this.columnService.update(id, updateColumnDto, req.user)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete one column.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of column' })
    @ApiResponse({
        status: 200,
        description: 'Column was successfully deleted.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestUser) {
        return this.columnService.remove(id, req.user)
    }
}
