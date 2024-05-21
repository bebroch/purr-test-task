import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
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

    public async findAll() {
        return `This action returns all user`
    }

    public async findOne(id: number) {
        return `This action returns a #${id} user`
    }

    public async update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    public async remove(id: number) {
        return `This action removes a #${id} user`
    }
}
