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
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Controller('card')
@UseGuards(UserGuard)
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    create(@Body() createCardDto: CreateCardDto) {
        return this.cardService.create(createCardDto)
    }

    @Get()
    findAll() {
        return this.cardService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cardService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
        return this.cardService.update(+id, updateCardDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cardService.remove(+id)
    }
}
