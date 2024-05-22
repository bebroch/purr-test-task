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
        await this.cardRepository.save(newCard)

        return newCard
    }

    async findAll(user: UserEntity) {
        const cards = await this.cardRepository.find({
            where: { user: { id: user.id } },
            relations: ['column'],
        })
        return cards
    }

    async findAllByColumn(columnId: number, user: UserEntity) {
        const column = await this.columnRepository.findOne({
            where: { id: columnId, user: { id: user.id } },
        })
        if (!column) throw new BadRequestException('Column not found')

        return await this.cardRepository.find({
            where: { column: { id: column.id }, user: { id: user.id } },
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

        const updateResult = await this.cardRepository.update(card.id, {
            title: updateCardDto.title,
            description: updateCardDto.description,
        })

        return { result: updateResult.affected > 0 ? 'success' : 'fail' }
    }

    async remove(id: number, user: UserEntity) {
        const isColumnExists = await this.cardRepository.exists({
            where: { id: id, user: { id: user.id } },
        })

        if (!isColumnExists) throw new BadRequestException('Column not found')
        const deleteResult = await this.cardRepository.delete(id)
        return { result: deleteResult.affected > 0 ? 'success' : 'fail' }
    }
}
