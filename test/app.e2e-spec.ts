import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import * as request from 'supertest'
import { DeepPartial, Repository } from 'typeorm'
import { LoginDto } from '../src/auth/dto/login.dto'
import { RegistrationDto } from '../src/auth/dto/registration.dto'
import { ColumnEntity } from '../src/database/entities/column.entity'
import { UserEntity } from '../src/database/entities/user.entity'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
    let app: INestApplication
    let userRepository: Repository<UserEntity>
    let columnRepository: Repository<ColumnEntity>

    const data: { users: UserEntity[]; columns: DeepPartial<ColumnEntity>[] } =
        { users: [], columns: [] }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                TypeOrmModule.forFeature([UserEntity, ColumnEntity]),
            ],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
        userRepository = moduleFixture.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        )
        columnRepository = moduleFixture.get<Repository<ColumnEntity>>(
            getRepositoryToken(ColumnEntity),
        )
    })

    afterAll(async () => {
        await userRepository.delete(data.users.map((user) => user.id))

        for (const column of data.columns) {
            await columnRepository.delete(column.id)
        }
    })

    describe('Auth', () => {
        const userData = {
            email: `${randomUUID()}@a.com`,
            password: 'asd',
        }

        it('/auth/registration (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/auth/registration')
                .send(userData as RegistrationDto)
                .expect(201)

            expect(res.body).toHaveProperty('token')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user.email).toBe(userData.email)
            data.users.push(res.body.user)
        })

        it('/auth/login (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/auth/login')
                .send(userData as LoginDto)
                .expect(201)

            expect(res.body).toHaveProperty('token')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user.email).toBe(userData.email)
        })
    })

    describe('Column Controller', () => {
        const columns: DeepPartial<ColumnEntity>[] = [
            { name: randomUUID() },
            { name: randomUUID() },
        ]

        it('/column (POST)', async () => {
            const res = await request(app.getHttpServer())
                .post('/column')
                .send(columns[0])
                .expect(201)

            expect(res.body).toHaveProperty('data')
            const column = res.body.data
            expect(column).toHaveProperty('id')
            expect(column.name).toBe(columns[0].name)
            data.columns.push(column)

            const res2 = await request(app.getHttpServer())
                .post('/column')
                .send(columns[1])
                .expect(201)

            data.columns.push(res2.body.data)
        })

        it('/column (GET)', async () => {
            const res = await request(app.getHttpServer())
                .get('/column')
                .expect(200)

            res.body.data.map((column, index) => {
                expect(column.id).toBe(data.columns[index].id)
                expect(column.name).toBe(data.columns[index].name)
            })
        })

        it('/column/:id (GET)', async () => {})

        it('/column/:id (PATCH)', async () => {})

        it('/column/:id (DELETE)', async () => {})
    })
})
