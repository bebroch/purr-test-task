import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '10d' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
