import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TokenModule } from '@token/token'
import { UserEntity } from 'src/database/entities/user.entity'
import { UserGuard } from './user.guard'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), TokenModule],
    providers: [UserGuard],
    exports: [UserGuard, TypeOrmModule.forFeature([UserEntity]), TokenModule],
})
export class UserGuardModule {}
