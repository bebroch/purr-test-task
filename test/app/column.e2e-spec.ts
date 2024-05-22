import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { randomUUID } from 'crypto'
import * as request from 'supertest'
import { DeepPartial, Repository } from 'typeorm'
import { AppModule } from '../../src/app.module'
import { ColumnEntity } from '../../src/database/entities/column.entity'

describe('Column Controller', () => {
    let app: INestApplication
    let columnRepository: Repository<ColumnEntity>

    const columns: DeepPartial<ColumnEntity>[] = [
        { name: randomUUID() },
        { name: randomUUID() },
    ]

    const newColumns: DeepPartial<ColumnEntity>[] = []

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TypeOrmModule.forFeature([ColumnEntity])],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()

        columnRepository = moduleFixture.get<Repository<ColumnEntity>>(
            getRepositoryToken(ColumnEntity),
        )
    })

    afterAll(async () => {
        for (const column of newColumns) {
            await columnRepository.delete(column.id)
        }
    })

    it('/column (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post('/column')
            .send(columns[0])
            .expect(201)

        expect(res.body).toHaveProperty('data')
        const column = res.body.data
        expect(column).toHaveProperty('id')
        expect(column.name).toBe(columns[0].name)
        newColumns.push(column)

        const res2 = await request(app.getHttpServer())
            .post('/column')
            .send(columns[1])
            .expect(201)

        newColumns.push(res2.body.data)
    })

    it('/column (GET)', async () => {})

    it('/column/:id (GET)', async () => {})

    it('/column/:id (PATCH)', async () => {})

    it('/column/:id (DELETE)', async () => {})
})
