import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/database/entities/user.entity'
import { UserEntityService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserEntityService],
    exports: [UserEntityService],
})
export class UserEntityModule {}
