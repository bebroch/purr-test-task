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

@Entity({ name: 'cards' })
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => ColumnEntity, (column) => column.id)
    column: ColumnEntity

    @OneToMany(() => CommentEntity, (comment) => comment.card)
    comments: CommentEntity[]
}
