import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockType } from 'test/types/mock.type'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

describe('UserService', () => {
    let service: UserService
    let repositoryMock: MockType<Repository<UserEntity>>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useFactory: jest.fn(() => ({
                        create: jest.fn((entity) => entity),
                        save: jest.fn((entity) => entity),
                    })),
                },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
        repositoryMock = module.get(getRepositoryToken(UserEntity))
    })

    it('test create', async () => {
        const user = { email: 'Alni', password: 'password', id: 1 }
        const userDto = new CreateUserDto({
            email: 'Alni',
            password: 'password',
        })
        repositoryMock.create.mockReturnValue(user)
        expect(await service.create(userDto)).toEqual(user)
        expect(repositoryMock.create).toHaveBeenCalledWith(userDto.get())
    })
})
