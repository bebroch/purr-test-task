import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ColumnEntity } from '../database/entities/column.entity'
import { UserEntity } from '../database/entities/user.entity'
import { CreateColumnDto } from './dto/create-column.dto'
import { UpdateColumnDto } from './dto/update-column.dto'

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
    ) {}

    async create(createColumnDto: CreateColumnDto, user: UserEntity) {
        delete user.password
        const newColumn = this.columnRepository.create({
            name: createColumnDto.name,
            user,
        })
        return await this.columnRepository.save(newColumn)
    }

    async findAll(user: UserEntity) {
        const columns = await this.columnRepository.find({
            where: { user: { id: user.id } },
        })
        return { count: columns.length, data: columns.length ? columns : null }
    }

    async findOne(id: number, user: UserEntity) {
        return await this.columnRepository.findOne({
            where: { id: id, user: { id: user.id } },
            relations: ['cards.comments'],
        })
    }

    async update(
        id: number,
        updateColumnDto: UpdateColumnDto,
        user: UserEntity,
    ) {
        const column = await this.columnRepository.findOne({
            where: { id, user: { id: user.id } },
        })

        if (!column) throw new BadRequestException('Column not found')
        return await this.columnRepository.update(column.id, {
            name: updateColumnDto.name,
        })
    }

    async remove(id: number, user: UserEntity) {
        const isColumnExists = await this.columnRepository.exists({
            where: { id: id, user: { id: user.id } },
        })

        if (!isColumnExists) throw new BadRequestException('Column not found')
        return await this.columnRepository.delete(id)
    }
}
