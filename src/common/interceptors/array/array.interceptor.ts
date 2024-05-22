import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class ArrayInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = (data: unknown) => {
            if (Array.isArray(data)) {
                return {
                    length: data.length,
                    data: data.length > 0 ? data : null,
                }
            }
        }

        return next.handle().pipe(map(handler))
    }
}
