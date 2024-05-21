import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenService } from '@token/token'
import { UserEntity } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly tokenService: TokenService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest()

        const token = request.headers.authorization?.split(' ')

        if (!token || !token[0] || token[0] !== 'Bearer' || !token[1])
            return false

        const isValidToken = await this.tokenService.decode<
            Pick<UserEntity, 'id' | 'email'>
        >(token[1])
        if (!isValidToken) return false

        const user = await this.userRepository.findOne({
            where: { id: isValidToken.id },
        })
        if (!user) return false

        request.user = user
        return true
    }
}
