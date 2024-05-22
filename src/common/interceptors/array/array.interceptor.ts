import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class DataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const handler = (data: unknown) => {
            if (Array.isArray(data)) {
                return {
                    length: data.length,
                    data: data.length > 0 ? data : null,
                }
            } else if (typeof data === 'object') {
                return { data: data ?? null }
            }

            return data
        }

        return next.handle().pipe(map(handler))
    }
}
