import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Card } from './card.entity'
import { Comment } from './comment.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @OneToMany(() => Card, (card) => card.user)
    cards: Card[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]
}
