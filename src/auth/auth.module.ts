import { Module } from '@nestjs/common'
import { TokenModule } from '@token/token'
import { UserModule } from 'src/database/services/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    imports: [UserModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
