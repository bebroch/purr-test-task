import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async sign(payload: Record<string, unknown>) {
        return await this.jwtService.signAsync(payload)
    }

    async decode<T>(token: string): Promise<T | null> {
        try {
            return await this.jwtService.decode(token)
        } catch (err) {
            return null
        }
    }
}
