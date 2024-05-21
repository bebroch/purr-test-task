import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenService } from '@token/token'
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly tokenService: TokenService,
    ) {}

    private sign(user: UserEntity) {
        const { id, email } = user
        return this.tokenService.sign({ id, email })
    }

    public async login(loginDto: LoginDto) {
        const { email, password } = loginDto

        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) throw new BadRequestException('User not found')

        const isValidPassword = await bcrypt.compare(user.password, password)

        if (isValidPassword)
            throw new BadRequestException('Email or password is not incorrect')

        const token = await this.sign(user)

        return {
            token,
            user: { ...user, password: undefined },
        }
    }

    public async registration(registrationDto: RegistrationDto) {
        const { email, password } = registrationDto

        const user = await this.userRepository.findOne({ where: { email } })
        if (user) throw new BadRequestException('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)
        const createDto = { email, password: hashedPassword }

        const newUser = await this.userRepository.save(
            this.userRepository.create(createDto),
        )
        const token = await this.sign(newUser)

        return {
            token,
            user: { ...newUser, password: undefined },
        }
    }
}
