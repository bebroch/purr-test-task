import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardEntity } from './entities/card.entity'
import { ColumnEntity } from './entities/column.entity'
import { CommentEntity } from './entities/comment.entity'
import { UserEntity } from './entities/user.entity'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                synchronize: true,
                entities: [UserEntity, ColumnEntity, CardEntity, CommentEntity],
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
