import { UserEntity } from 'src/database/entities/user.entity'

export class CreateUserDto {
    private email: string
    private password: string

    constructor(userData: Pick<UserEntity, 'email' | 'password'>) {
        Object.assign(this, userData)
    }

    public get() {
        return {
            email: this.email,
            password: this.password,
        }
    }
}
