import {
    Column as ColumnTypeorm,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Card } from './card.entity'

@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    id: number

    @ColumnTypeorm()
    name: string

    @ColumnTypeorm()
    created_at: Date

    @ColumnTypeorm()
    updated_at: Date

    @OneToMany(() => Card, (card) => card.column)
    cards: Card[]
}
