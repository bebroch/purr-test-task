import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import * as request from 'supertest'
import { Repository } from 'typeorm'
import { AppModule } from '../../src/app.module'
import { LoginDto } from '../../src/auth/dto/login.dto'
import { RegistrationDto } from '../../src/auth/dto/registration.dto'
import { UserEntity } from '../../src/database/entities/user.entity'

describe('Auth', () => {
    let app: INestApplication
    let userRepository: Repository<UserEntity>
    const userData = {
        email: `${randomUUID()}@a.com`,
        password: 'asd',
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TypeOrmModule.forFeature([UserEntity])],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        userRepository = moduleFixture.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        )
    })

    it('/auth/registration (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/registration')
            .send(userData as RegistrationDto)
            .expect(201)

        expect(res.body).toHaveProperty('token')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user.email).toBe(userData.email)
    })

    it('/auth/login (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(userData as LoginDto)
            .expect(201)

        expect(res.body).toHaveProperty('token')
        expect(res.body.user).toHaveProperty('id')
        expect(res.body.user.email).toBe(userData.email)

        await userRepository.delete(res.body.user.id)
    })
})
