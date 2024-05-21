import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ColumnEntity } from 'src/database/entities/column.entity'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
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
        await this.columnRepository.save(newColumn)

        return newColumn
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
        return await this.columnRepository.update(column, {
            name: updateColumnDto.name,
        })
    }

    async remove(id: number, user: UserEntity) {
        const isColumnExists = await this.columnRepository.exists({
            where: { id: id, user: { id: user.id } },
        })

        if (!isColumnExists) throw new BadRequestException('Column not found')
        const deleteResult = await this.columnRepository.delete(id)
        return { result: deleteResult.affected > 0 ? 'success' : 'fail' }
    }
}
