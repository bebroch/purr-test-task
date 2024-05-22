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
} from '@nestjs/common'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { RequestUser } from 'src/common/types/user/request.type'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Controller('card')
@UseGuards(UserGuard)
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    create(@Body() createCardDto: CreateCardDto, @Req() req: RequestUser) {
        return this.cardService.create(createCardDto, req.user)
    }

    @Get()
    findAll(@Req() req: RequestUser) {
        return this.cardService.findAll(req.user)
    }

    @Get('col')
    findAllByColumn(
        @Query('columnId', ParseIntPipe) columnId: number,
        @Req() req: RequestUser,
    ) {
        return this.cardService.findAllByColumn(columnId, req.user)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: RequestUser) {
        return this.cardService.findOne(+id, req.user)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCardDto: UpdateCardDto,
        @Req() req: RequestUser,
    ) {
        return this.cardService.update(+id, updateCardDto, req.user)
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestUser) {
        return this.cardService.remove(+id, req.user)
    }
}
