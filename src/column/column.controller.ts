import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { AffectOrmInterceptor } from 'src/common/interceptors/affect-orm/affect-orm.interceptor'
import { RequestUser } from 'src/common/types/user/request.type'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { UpdateColumnDto } from './dto/update-column.dto'

@Controller('column')
@UseGuards(UserGuard)
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Post()
    create(@Body() createColumnDto: CreateColumnDto, @Req() req: RequestUser) {
        return this.columnService.create(createColumnDto, req.user)
    }

    @Get()
    findAll(@Req() req: RequestUser) {
        return this.columnService.findAll(req.user)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: RequestUser) {
        return this.columnService.findOne(+id, req.user)
    }

    @Patch(':id')
    @UseInterceptors(AffectOrmInterceptor)
    update(
        @Param('id') id: string,
        @Body() updateColumnDto: UpdateColumnDto,
        @Req() req: RequestUser,
    ) {
        return this.columnService.update(+id, updateColumnDto, req.user)
    }

    @Delete(':id')
    @UseInterceptors(AffectOrmInterceptor)
    remove(@Param('id') id: string, @Req() req: RequestUser) {
        return this.columnService.remove(+id, req.user)
    }
}
