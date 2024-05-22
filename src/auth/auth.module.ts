import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TokenModule } from '@token/token'
import { UserEntity } from 'src/database/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [TokenModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
