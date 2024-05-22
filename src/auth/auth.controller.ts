import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegistrationDto } from './dto/registration.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 201, description: 'User logged in successfully' })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    public login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('registration')
    @ApiOperation({ summary: 'Register new user' })
    @ApiBody({ type: RegistrationDto })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Invalid registration data' })
    public registration(@Body() registrationDto: RegistrationDto) {
        return this.authService.registration(registrationDto)
    }
}
