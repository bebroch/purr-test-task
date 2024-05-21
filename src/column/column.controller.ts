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
} from '@nestjs/common'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { UserEntity } from 'src/database/entities/user.entity'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { UpdateColumnDto } from './dto/update-column.dto'

@Controller('column')
@UseGuards(UserGuard)
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Post()
    create(
        @Body() createColumnDto: CreateColumnDto,
        @Req() req: { user: UserEntity },
    ) {
        return this.columnService.create(createColumnDto, req.user)
    }

    @Get()
    findAll(@Req() req: { user: UserEntity }) {
        return this.columnService.findAll(req.user)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: { user: UserEntity }) {
        return this.columnService.findOne(+id, req.user)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateColumnDto: UpdateColumnDto,
        @Req() req: { user: UserEntity },
    ) {
        return this.columnService.update(+id, updateColumnDto, req.user)
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: { user: UserEntity }) {
        return this.columnService.remove(+id, req.user)
    }
}
