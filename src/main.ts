import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }))

    // TODO мб потом сделать свои методы для свагера
    // Что бы не указывать всё с нуля просто въебенить ApiResponseForbidden
    const config = new DocumentBuilder()
        .setTitle('Api name')
        .setDescription('The API description')
        .setVersion('1.3')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
