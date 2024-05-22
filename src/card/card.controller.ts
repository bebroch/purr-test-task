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
import { AffectOrmInterceptor } from 'src/common/interceptors/affect-orm/affect-orm.interceptor'
import { DataInterceptor } from 'src/common/interceptors/array/array.interceptor'
import { RequestUser } from 'src/common/types/user/request.type'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Controller('card')
@UseGuards(UserGuard)
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    @UseInterceptors(DataInterceptor)
    create(@Body() createCardDto: CreateCardDto, @Req() req: RequestUser) {
        return this.cardService.create(createCardDto, req.user)
    }

    @Get()
    @UseInterceptors(DataInterceptor)
    findAll(@Req() req: RequestUser) {
        return this.cardService.findAll(req.user)
    }

    @Get('col')
    @UseInterceptors(DataInterceptor)
    findByColumn(
        @Query('columnId', ParseIntPipe) columnId: number,
        @Req() req: RequestUser,
    ) {
        return this.cardService.findByColumn(columnId, req.user)
    }

    @Get(':id')
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id') id: string, @Req() req: RequestUser) {
        return this.cardService.findOne(+id, req.user)
    }

    @Patch(':id')
    @UseInterceptors(AffectOrmInterceptor)
    update(
        @Param('id') id: string,
        @Body() updateCardDto: UpdateCardDto,
        @Req() req: RequestUser,
    ) {
        return this.cardService.update(+id, updateCardDto, req.user)
    }

    @Delete(':id')
    @UseInterceptors(AffectOrmInterceptor)
    remove(@Param('id') id: string, @Req() req: RequestUser) {
        return this.cardService.remove(+id, req.user)
    }
}
