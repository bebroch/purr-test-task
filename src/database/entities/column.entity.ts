import {
    Column as ColumnTypeorm,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Card } from './card.entity'
import { User } from './user.entity'

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

    @ManyToOne(() => User, (user) => user.id)
    user: User[]

    @OneToMany(() => Card, (card) => card.column)
    cards: Card[]
}
