import {
    Column as ColumnTypeorm,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { CardEntity } from './card.entity'
import { UserEntity } from './user.entity'

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ColumnTypeorm()
    name: string

    @ColumnTypeorm()
    created_at: Date

    @ColumnTypeorm()
    updated_at: Date

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity[]

    @OneToMany(() => CardEntity, (card) => card.column)
    cards: CardEntity[]
}
