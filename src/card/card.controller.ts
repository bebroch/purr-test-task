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
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { UserGuard } from 'src/auth/guards/user/user.guard'
import { AffectOrmInterceptor } from 'src/common/interceptors/affect-orm/affect-orm.interceptor'
import { DataInterceptor } from 'src/common/interceptors/array/array.interceptor'
import { ParseOptionalIntPipe } from 'src/common/pipes/parse-optional-int/parse-optional-int.pipe'
import { RequestUser } from 'src/common/types/user/request.type'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Controller('card')
@ApiTags('card')
@UseGuards(UserGuard)
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    @ApiOperation({ summary: 'Create Card.' })
    @ApiBody({ type: CreateCardDto })
    @ApiResponse({ status: 201, description: 'Card was created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @UseInterceptors(DataInterceptor)
    create(@Body() createCardDto: CreateCardDto, @Req() req: RequestUser) {
        return this.cardService.create(createCardDto, req.user)
    }

    @Get()
    @ApiOperation({ summary: 'Get cards by query parameters or all.' })
    @ApiQuery({
        name: 'columnId',
        type: Number,
        required: false,
        description: 'ID of column',
    })
    @ApiResponse({
        status: 200,
        description: 'Cards were successfully received.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findAll(
        @Query('columnId', ParseOptionalIntPipe) columnId: number,
        @Req() req: RequestUser,
    ) {
        return this.cardService.findAll({ columnId }, req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one card.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of card' })
    @ApiResponse({
        status: 200,
        description: 'Card was successfully received.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(DataInterceptor)
    findOne(@Param('id', ParseIntPipe) id: number, @Req() req: RequestUser) {
        return this.cardService.findOne(id, req.user)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update one card.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of card' })
    @ApiResponse({
        status: 200,
        description: 'Card was successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCardDto: UpdateCardDto,
        @Req() req: RequestUser,
    ) {
        return this.cardService.update(id, updateCardDto, req.user)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete one card.' })
    @ApiParam({ name: 'id', type: Number, description: 'ID of card' })
    @ApiResponse({
        status: 200,
        description: 'Card was successfully deleted.',
    })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @UseInterceptors(AffectOrmInterceptor)
    remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestUser) {
        return this.cardService.remove(id, req.user)
    }
}
