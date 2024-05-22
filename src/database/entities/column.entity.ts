import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { CardEntity } from './card.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'columns' })
export class ColumnEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => UserEntity, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: UserEntity

    @OneToMany(() => CardEntity, (card) => card.column)
    cards: CardEntity[]
}
