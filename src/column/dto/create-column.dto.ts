import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateColumnDto {
    @ApiProperty({
        description: 'Column title.',
        example: 'My Column Name',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly name: string
}
