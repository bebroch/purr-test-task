import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Card } from './card.entity'
import { User } from './user.entity'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Card, (card) => card.id)
    card: Card
}
