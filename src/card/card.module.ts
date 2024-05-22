import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserGuardModule } from '../auth/guards/user/user.guard.module'
import { CardEntity } from '../database/entities/card.entity'
import { ColumnEntity } from '../database/entities/column.entity'
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
