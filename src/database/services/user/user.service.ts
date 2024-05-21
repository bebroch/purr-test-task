import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/database/entities/user.entity'
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    public async create(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto.get())
        return await this.userRepository.save(newUser)
    }

    public async find(options?: FindManyOptions<UserEntity>) {
        return await this.userRepository.find(options)
    }

    public async findOne(options?: FindOneOptions<UserEntity>) {
        return await this.userRepository.findOne(options)
    }

    public async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne({ where: { id } })
        console.log(user)
        if (!user) throw new Error('User not found')

        return await this.userRepository.save({
            ...user,
            ...updateUserDto.get(),
        })
    }

    public async delete(id: number) {
        const user = await this.findOne({ where: { id } })
        if (!user) throw new Error('User not found')
        return await this.userRepository.delete(user)
    }
}
