import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ColumnEntity } from './column.entity'
import { CommentEntity } from './comment.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'cards' })
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @ManyToOne(() => ColumnEntity, (column) => column.id)
    column: ColumnEntity

    @OneToMany(() => CommentEntity, (comment) => comment.card)
    comments: CommentEntity[]
}
