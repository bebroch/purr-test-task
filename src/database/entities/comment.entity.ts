import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CardEntity } from './card.entity'

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToOne(() => CardEntity, (card) => card.id)
    card: CardEntity
}
