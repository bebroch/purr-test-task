import {
    Column as ColumnTypeorm,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Column } from './column.entity'
import { Comment } from './comment.entity'

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @ColumnTypeorm()
    text: string

    @ColumnTypeorm()
    created_at: Date

    @ColumnTypeorm()
    updated_at: Date

    @ManyToOne(() => Column, (column) => column.id)
    column: Column

    @OneToMany(() => Comment, (comment) => comment.card)
    comments: Comment[]
}
