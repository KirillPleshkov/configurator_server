import {Body, Controller, Post} from '@nestjs/common';
import {RegistrationDto} from "./dto/RegistrationUser.dto";
import {UsersService} from "./users.service";
import {LoginDto} from "./dto/LoginUser.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/registration')
    registration(@Body() registrationDto: RegistrationDto) {
        return this.usersService.registration(registrationDto)
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto)
    }
}
