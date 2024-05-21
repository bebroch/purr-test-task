import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Card } from './card.entity'

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

    @ManyToOne(() => Card, (card) => card.id)
    card: Card
}
