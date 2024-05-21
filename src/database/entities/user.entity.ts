import {
    Column as ColumnTypeorm,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Column } from './column.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @ColumnTypeorm()
    email: string

    @ColumnTypeorm()
    password: string

    @ColumnTypeorm()
    created_at: Date

    @ColumnTypeorm()
    updated_at: Date

    @OneToMany(() => Column, (column) => column.user)
    columns: Column[]
}
