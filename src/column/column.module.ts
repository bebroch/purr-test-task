import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserGuardModule } from 'src/auth/guards/user/user.guard.module'
import { ColumnEntity } from 'src/database/entities/column.entity'
import { ColumnController } from './column.controller'
import { ColumnService } from './column.service'

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity]), UserGuardModule],
    controllers: [ColumnController],
    providers: [ColumnService],
})
export class ColumnModule {}
