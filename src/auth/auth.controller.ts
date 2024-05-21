import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('registration')
    public registration(@Body() registrationDto: RegistrationDto) {
        return this.authService.registration(registrationDto)
    }
}
