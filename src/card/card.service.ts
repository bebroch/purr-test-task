import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from 'src/database/entities/card.entity'
import { ColumnEntity } from 'src/database/entities/column.entity'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
    ) {}

    async create(createCardDto: CreateCardDto, user: UserEntity) {
        const column = await this.columnRepository.findOne({
            where: { id: createCardDto.columnId, user: { id: user.id } },
        })
        if (!column) throw new BadRequestException('Column not found')

        delete user.password
        const newCard = this.cardRepository.create({
            title: createCardDto.title,
            description: createCardDto.description,
            user,
            column,
        })
        return await this.cardRepository.save(newCard)
    }

    async findAll(query: { columnId?: number }, user: UserEntity) {
        return await this.cardRepository.find({
            where: { column: { id: query.columnId }, user: { id: user.id } },
            relations: ['column'],
        })
    }

    async findOne(id: number, user: UserEntity) {
        return await this.cardRepository.findOne({
            where: { id: id, user: { id: user.id } },
            relations: ['column'],
        })
    }

    async update(id: number, updateCardDto: UpdateCardDto, user: UserEntity) {
        const card = await this.cardRepository.findOne({
            where: { id, user: { id: user.id } },
        })
        if (!card) throw new BadRequestException('Card not found')

        return await this.cardRepository.update(card.id, {
            title: updateCardDto.title,
            description: updateCardDto.description,
        })
    }

    async remove(id: number, user: UserEntity) {
        const isCardExists = await this.cardRepository.exists({
            where: { id: id, user: { id: user.id } },
        })

        if (!isCardExists) throw new BadRequestException('Card not found')
        return await this.cardRepository.delete(id)
    }
}
