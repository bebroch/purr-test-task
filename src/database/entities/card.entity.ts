import {
    Column as ColumnTypeorm,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ColumnEntity } from './column.entity'
import { CommentEntity } from './comment.entity'

@Entity()
export class CardEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ColumnTypeorm()
    text: string

    @ColumnTypeorm()
    created_at: Date

    @ColumnTypeorm()
    updated_at: Date

    @ManyToOne(() => ColumnEntity, (column) => column.id)
    column: ColumnEntity

    @OneToMany(() => CommentEntity, (comment) => comment.card)
    comments: CommentEntity[]
}
