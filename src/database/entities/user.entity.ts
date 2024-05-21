import {
    Column as ColumnTypeorm,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ColumnEntity } from './column.entity'

@Entity()
export class UserEntity {
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

    @OneToMany(() => ColumnEntity, (column) => column.user)
    columns: ColumnEntity[]
}
