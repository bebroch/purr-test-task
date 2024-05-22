import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class AffectOrmInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = (data: unknown) => {
            if (
                typeof data === 'object' &&
                'affected' in data &&
                typeof data.affected === 'number'
            ) {
                return { result: data.affected > 0 ? 'success' : 'fail' }
            }
            return data
        }

        return next.handle().pipe(map(handler))
    }
}
