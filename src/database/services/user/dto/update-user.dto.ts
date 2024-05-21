import { UserEntity } from 'src/database/entities/user.entity'

export class UpdateUserDto {
    private email?: string
    private password?: string

    constructor(userData: Partial<Pick<UserEntity, 'email' | 'password'>>) {
        Object.assign(this, userData)
    }

    public get() {
        return Object.assign({}, this)
    }
}
