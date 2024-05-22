import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserGuardModule } from 'src/auth/guards/user/user.guard.module'
import { CardEntity } from 'src/database/entities/card.entity'
import { ColumnEntity } from 'src/database/entities/column.entity'
import { CardController } from './card.controller'
import { CardService } from './card.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, ColumnEntity]),
        UserGuardModule,
    ],
    controllers: [CardController],
    providers: [CardService],
})
export class CardModule {}
