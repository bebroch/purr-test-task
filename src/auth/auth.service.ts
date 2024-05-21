import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Injectable()
export class AuthService {
    public async login(loginDto: LoginDto) {
        const { email, password } = loginDto
    }

    public async registration(registrationDto: RegistrationDto) {
        const { email, password } = registrationDto
    }
}
