import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { ColumnService } from './column.service'
import { CreateColumnDto } from './dto/create-column.dto'
import { UpdateColumnDto } from './dto/update-column.dto'

@Controller('column')
@UseGuards(UserGuard)
export class ColumnController {
    constructor(private readonly columnService: ColumnService) {}

    @Post()
    create(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.create(createColumnDto)
    }

    @Get()
    findAll() {
        return this.columnService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.columnService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.update(+id, updateColumnDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.columnService.remove(+id)
    }
}
