import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { MockType } from 'test/types/mock.type'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
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
                        findOne: jest.fn((entity) => entity),
                        save: jest.fn((entity) => entity),
                        update: jest.fn((entity) => entity),
                        delete: jest.fn((entity) => entity),
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

    describe('test update', () => {
        it('not error', async () => {
            const user = { id: 1, email: 'Alni', password: 'password' }
            const userDto = new UpdateUserDto({
                email: 'Nats',
            })
            const updatedUser = { ...user, ...userDto.get() }
            repositoryMock.findOne.mockReturnValue(user)
            repositoryMock.save.mockReturnValue(updatedUser)
            expect(await service.update(user.id, userDto)).toEqual(updatedUser)
            expect(repositoryMock.save).toHaveBeenCalledWith(updatedUser)
        })

        it('user not found', async () => {
            const userDto = new UpdateUserDto({
                email: 'Nats',
            })
            repositoryMock.findOne.mockReturnValue(null)
            expect(
                async () => await service.update(1, userDto),
            ).rejects.toThrow('User not found')
        })
    })

    describe('test delete', () => {
        it('not error', async () => {
            const user = { id: 1, email: 'Alni', password: 'password' }

            repositoryMock.findOne.mockReturnValue(user)
            repositoryMock.delete.mockReturnValue({ affected: 1 })
            expect(await service.delete(user.id)).toEqual({ affected: 1 })
            expect(repositoryMock.findOne).toHaveBeenCalledWith({
                where: { id: user.id },
            })
            expect(repositoryMock.delete).toHaveBeenCalledWith(user)
        })

        it('user not found', async () => {
            const user = { id: 1, email: 'Alni', password: 'password' }

            repositoryMock.findOne.mockReturnValue(undefined)
            expect(async () => await service.delete(user.id)).rejects.toThrow(
                'User not found',
            )
            expect(repositoryMock.findOne).toHaveBeenCalledWith({
                where: { id: user.id },
            })
        })
    })
})
