import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from 'src/database/entities/card.entity'
import { CommentEntity } from 'src/database/entities/comment.entity'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    async create(createCommentDto: CreateCommentDto, user: UserEntity) {
        const card = await this.cardRepository.findOne({
            where: { id: createCommentDto.cardId, user: { id: user.id } },
        })
        if (!card) throw new BadRequestException('Card not found')

        delete user.password
        const newComment = this.commentRepository.create({
            text: createCommentDto.text,
            user,
            card,
        })
        return await this.commentRepository.save(newComment)
    }

    async findAll(user: UserEntity) {
        return await this.commentRepository.find({
            where: { user: { id: user.id } },
            relations: ['card'],
        })
    }

    async findAllByCard(cardId: number, user: UserEntity) {
        const card = await this.cardRepository.findOne({
            where: { id: cardId, user: { id: user.id } },
        })
        if (!card) throw new BadRequestException('Card not found')

        return await this.commentRepository.find({
            where: { card: { id: card.id }, user: { id: user.id } },
        })
    }

    async findOne(id: number, user: UserEntity) {
        return await this.commentRepository.findOne({
            where: { id: id, user: { id: user.id } },
            relations: ['card'],
        })
    }

    async update(
        id: number,
        updateCommentDto: UpdateCommentDto,
        user: UserEntity,
    ) {
        const comment = await this.commentRepository.findOne({
            where: { id, user: { id: user.id } },
        })
        if (!comment) throw new BadRequestException('Comment not found')

        return await this.commentRepository.update(comment.id, {
            text: updateCommentDto.text,
        })
    }

    async remove(id: number, user: UserEntity) {
        const isCommentExists = await this.commentRepository.exists({
            where: { id: id, user: { id: user.id } },
        })
        if (!isCommentExists) throw new BadRequestException('Comment not found')
        return await this.commentRepository.delete(id)
    }
}
