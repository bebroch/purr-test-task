import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common'

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata) {
        if (value === undefined) return undefined

        if (isNaN(+value))
            throw new BadRequestException('Invalid number format')

        return +value
    }
}
