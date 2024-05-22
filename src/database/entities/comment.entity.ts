import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { CardEntity } from './card.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'comments' })
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => UserEntity, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: UserEntity

    @ManyToOne(() => CardEntity, (card) => card.id, {
        onDelete: 'CASCADE',
    })
    card: CardEntity
}
