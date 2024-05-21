import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ColumnModule } from './column/column.module'
import { CardModule } from './card/card.module'
import { CommentModule } from './comment/comment.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        AuthModule,
        ColumnModule,
        CardModule,
        CommentModule,
    ],
})
export class AppModule {}
